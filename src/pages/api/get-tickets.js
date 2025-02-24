import poolPromise from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { phone } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("phone", sql.VarChar, phone)
      .query("SELECT * FROM Users WHERE phone = @phone");

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "No ticket found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}