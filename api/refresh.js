import { grabOTP } from "../lib/gmail.js";

const GMAIL_CONFIG = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
};

const EMAIL_CONTACTS = {
  'email1': process.env.EMAIL_CONTACT_1 || 'tinkly02grahams@icloud.com',
  'email2': process.env.EMAIL_CONTACT_2 || 'semis.settee0c@icloud.com',
  'email3': process.env.EMAIL_CONTACT_3 || 'stone-lend.0d@icloud.com'
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email } = req.query;

    if (!email || !EMAIL_CONTACTS[email]) {
      return res.status(400).json({ error: "Invalid email contact" });
    }

    const contactEmail = EMAIL_CONTACTS[email];
    const excludeSubject = `-subject:"reset password" -subject:"reset your password" -subject:"password reset" -subject:"change password" -subject:"ubah password" -subject:"atur ulang kata sandi" -subject:"Kode verifikasimu" -subject:"verify"`;
    const excludeBody = `-body:"Kami menerima permintaan untuk mengubah informasi akunmu."`;
    const senderNetflix = `from:info@account.netflix.com`;
    const query = `${senderNetflix} newer_than:1d ${excludeSubject} ${excludeBody}`;

    console.log(`[Refresh] Querying ${contactEmail} with:`, query);
    const results = await grabOTP(GMAIL_CONFIG, query);

    return res.status(200).json({ ok: true, results, email: contactEmail });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}