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
      await pool.request()
        .input("phone", sql.VarChar, phone)
        .input("status", sql.VarChar, "verified")
        .query("INSERT INTO Users (phone, status) VALUES (@phone, @status)");

      return res.status(200).json({ message: "User verified, proceed to details form" });
    } else {
      return res.status(200).json({ message: "User already exists, proceed to next step" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}