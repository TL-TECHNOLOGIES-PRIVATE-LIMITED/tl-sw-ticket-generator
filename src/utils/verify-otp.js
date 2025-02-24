import { adminAuth } from "../../utils/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res.status(400).json({ error: "Phone number and OTP are required" });
  }

  try {
    const user = await adminAuth.verifyIdToken(otp);
    return res.json({ success: true, user });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ error: error.message });
  }
}
