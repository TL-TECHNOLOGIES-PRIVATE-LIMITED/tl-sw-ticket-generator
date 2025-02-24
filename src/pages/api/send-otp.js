import { adminAuth } from "../../utils/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number is required" });
  }

  try {
    const session = await adminAuth.createSessionCookie(phoneNumber, { expiresIn: 5 * 60 * 1000 }); // 5 min expiry
    return res.json({ success: true, session });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: error.message });
  }
}
