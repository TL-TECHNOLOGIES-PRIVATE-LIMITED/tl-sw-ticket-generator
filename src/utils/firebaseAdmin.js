import admin from "firebase-admin";

const FIREBASE_ADMIN_CREDENTIALS = {
  type: "service_account",
  project_id: "swayamvara-ticket-generator",
  private_key: `6LcIL94qAAAAAFBHLK\nsketF\ny4M107RFK7k7Rw7`,
  client_email: "firebase-adminsdk-fbsvc@swayamvara-ticket-generator.iam.gserviceaccount.com",
};

const RECAPTCHA_SECRET_KEY = "6LcIL94qAAAAAFBHLK_sketF_y4M107RFK7k7Rw7";

// Avoid multiple initializations in Next.js hot reload
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_ADMIN_CREDENTIALS),
  });
}

export const adminAuth = admin.auth();
export const recaptchaSecret = RECAPTCHA_SECRET_KEY;
