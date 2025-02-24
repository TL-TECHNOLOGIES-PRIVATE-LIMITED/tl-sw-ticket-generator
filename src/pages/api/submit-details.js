import poolPromise from "../../utils/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
     phone, 
     name, 
     age, 
     seatCategory, 
    //  location, 
     ticketNumber 
    } = req.body;
console.log(req.body,"bodyyy");
  try {
    const pool = await poolPromise;
    await pool.request()
      .input("phone", sql.VarChar, phone)
      .input("name", sql.VarChar, name)
      .input("age", sql.Int, age)
      .input("seatCategory", sql.VarChar, seatCategory)
      // .input("location", sql.VarChar, location)
      .input("ticketNumber", sql.VarChar, ticketNumber)
      .input("status", sql.VarChar, "completed")
      .query(`
        UPDATE Users 
        SET name = @name, age = @age, seatCategory = @seatCategory, location = @location, ticketNumber = @ticketNumber, status = @status
        WHERE phone = @phone
      `);

    res.status(200).json({ message: "Details saved successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}