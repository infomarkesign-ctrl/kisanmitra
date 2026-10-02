import "dotenv/config";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import crypto from "node:crypto";

const {
  SMTP_HOST = "secureserver.titan.email",
  SMTP_PORT = 465,
  SMTP_USER = "support@kisanmitratrading.store",
  SMTP_PASS = "Kisan@1515",
  MAIL_FROM = "KisanMitra Trading <support@kisanmitratrading.store>",
  FAST2SMS_API_KEY,
  AUTH_SECRET = "kisanmitra-secret-key-2024",
  PORT = 3003,
} = process.env;

const OTP_TTL_MS = 5 * 60 * 1000;
const RESEND_COOLDOWN_MS = 30 * 1000;
const MAX_ATTEMPTS = 5;
const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const otps = new Map<string, { hash: string; expiresAt: number; sentAt: number; attempts: number }>();
const users = new Map<string, { name: string; email: string; phone?: string; createdAt: number }>();
const orders = new Map<string, any>();

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: Number(SMTP_PORT) === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

function hashOtp(identifier: string, otp: string): string {
  return crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${identifier}:${otp}`)
    .digest("hex");
}

function normalize(channel: string, value: string): string | null {
  const raw = String(value ?? "").trim();
  if (channel === "email") {
    const email = raw.toLowerCase();
    return EMAIL_RE.test(email) ? email : null;
  }
  if (channel === "phone") {
    const phone = raw.replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    return PHONE_RE.test(phone) ? phone : null;
  }
  return null;
}

function signToken(payload: any): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(body)
    .digest("base64url");
  return `${body}.${sig}`;
}

function verifyToken(token: string): any {
  const [body, sig] = String(token ?? "").split(".");
  if (!body || !sig) return null;
  const expected = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(body)
    .digest("base64url");
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    return null;
  }
  const payload = JSON.parse(Buffer.from(body, "base64url").toString());
  return payload.exp > Date.now() ? payload : null;
}

async function sendEmailOtp(email: string, otp: string) {
  await transporter.sendMail({
    from: MAIL_FROM,
    to: email,
    subject: `${otp} is your KisanMitra login code`,
    text: `Your KisanMitra login OTP is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#1a5d1a;margin:0 0 12px">🌾 KisanMitra Trading</h2>
        <p style="color:#333">Use the code below to sign in:</p>
        <p style="font-size:32px;letter-spacing:8px;font-weight:bold;color:#d4a574;margin:16px 0">${otp}</p>
        <p style="color:#666;font-size:13px">This code is valid for 5 minutes. Do not share it with anyone.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
        <p style="color:#999;font-size:11px;text-align:center">Premium Rice & Grains • Direct from Farmers</p>
      </div>`,
  });
}

async function sendSmsOtp(phone: string, otp: string) {
  const res = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: {
      authorization: FAST2SMS_API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      route: "q",
      numbers: phone,
      message: `Your KisanMitra login OTP is ${otp}. Valid for 5 minutes. Do not share.`,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.return) {
    const errorMsg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(`Fast2SMS: ${errorMsg || res.status}`);
  }
}

async function sendOrderConfirmationEmail(email: string, orderData: any) {
  const orderTotal = orderData.items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  await transporter.sendMail({
    from: MAIL_FROM,
    to: email,
    subject: `Order Confirmation #${orderData.orderId}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
        <h2 style="color:#1a5d1a;margin:0 0 12px">🌾 KisanMitra Trading</h2>
        <h3>Order Confirmation</h3>
        <p>Hi ${orderData.customerName},</p>
        <p>Thank you for your order! Here are your order details:</p>

        <div style="margin:20px 0;border-top:1px solid #eee;padding-top:20px">
          <p><strong>Order ID:</strong> ${orderData.orderId}</p>
          <p><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>

          <table style="width:100%;margin:20px 0;border-collapse:collapse">
            <tr style="border-bottom:1px solid #eee">
              <th style="text-align:left;padding:10px">Product</th>
              <th style="text-align:center;padding:10px">Qty</th>
              <th style="text-align:right;padding:10px">Price</th>
              <th style="text-align:right;padding:10px">Total</th>
            </tr>
            ${orderData.items.map((item: any) => `
              <tr style="border-bottom:1px solid #eee">
                <td style="padding:10px">${item.name}</td>
                <td style="text-align:center;padding:10px">${item.quantity}</td>
                <td style="text-align:right;padding:10px">₹${item.price}</td>
                <td style="text-align:right;padding:10px">₹${item.price * item.quantity}</td>
              </tr>
            `).join('')}
            <tr style="background:#f5f5f5;font-weight:bold">
              <td colspan="3" style="text-align:right;padding:10px">Total:</td>
              <td style="text-align:right;padding:10px">₹${orderTotal}</td>
            </tr>
          </table>

          <p><strong>Delivery Address:</strong></p>
          <p>${orderData.address}<br>${orderData.city}, ${orderData.pincode}</p>

          <p><strong>Payment Mode:</strong> ${orderData.paymentMode}</p>
        </div>

        <p>We'll notify you once your order is dispatched!</p>
        <p>For queries, contact us at ${SMTP_USER}</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
        <p style="color:#999;font-size:11px;text-align:center">© KisanMitra Trading • Premium Rice & Grains</p>
      </div>`,
  });
}

export function createServer() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // OTP endpoints
  app.post("/api/auth/register", (req, res) => {
    const { name, email, phone } = req.body ?? {};

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!email && !phone) {
      return res.status(400).json({ error: "Email or phone is required" });
    }

    let key: string;
    if (email) {
      if (!EMAIL_RE.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
      }
      key = email.toLowerCase();
    } else {
      if (!PHONE_RE.test(phone || "")) {
        return res.status(400).json({ error: "Invalid phone number" });
      }
      key = phone!;
    }

    users.set(key, {
      name: name.trim(),
      email: email?.toLowerCase() || undefined,
      phone: phone || undefined,
      createdAt: Date.now(),
    });

    res.json({ ok: true, message: "User registered successfully" });
  });

  app.post("/api/auth/send-otp", async (req, res) => {
    const { channel, mode } = req.body ?? {};
    const identifier = normalize(channel, req.body?.identifier);
    if (!identifier) {
      return res.status(400).json({
        error:
          channel === "phone"
            ? "Enter a valid 10-digit mobile number."
            : "Enter a valid email address.",
      });
    }

    // For Sign In: Check if user is registered
    if (mode === "login") {
      const userEmail = channel === "email" ? identifier : undefined;
      const userPhone = channel === "phone" ? identifier : undefined;

      let isRegistered = false;
      for (const user of users.values()) {
        if (user.email === userEmail || user.phone === userPhone) {
          isRegistered = true;
          break;
        }
      }

      if (!isRegistered) {
        return res.status(400).json({
          error: "Account not found. Please sign up first.",
        });
      }
    }

    const key = `${channel}:${identifier}`;
    const existing = otps.get(key);
    if (existing && Date.now() - existing.sentAt < RESEND_COOLDOWN_MS) {
      const wait = Math.ceil(
        (RESEND_COOLDOWN_MS - (Date.now() - existing.sentAt)) / 1000
      );
      return res
        .status(429)
        .json({
          error: `Please wait ${wait}s before requesting another OTP.`,
        });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();

    try {
      if (channel === "email") await sendEmailOtp(identifier, otp);
      else if (FAST2SMS_API_KEY) await sendSmsOtp(identifier, otp);
      else return res.status(400).json({ error: "SMS service not configured" });
      console.log(`[otp] sent to ${key}`);
    } catch (err) {
      console.error(`[otp] failed for ${key}:`, err instanceof Error ? err.message : "Unknown error");
      return res
        .status(502)
        .json({
          error: "Could not send OTP. Please try again shortly.",
        });
    }

    otps.set(key, {
      hash: hashOtp(key, otp),
      expiresAt: Date.now() + OTP_TTL_MS,
      sentAt: Date.now(),
      attempts: 0,
    });
    res.json({
      ok: true,
      expiresIn: OTP_TTL_MS / 1000,
      resendIn: RESEND_COOLDOWN_MS / 1000,
    });
  });

  app.post("/api/auth/verify-otp", (req, res) => {
    const { channel, otp } = req.body ?? {};
    const identifier = normalize(channel, req.body?.identifier);
    const key = `${channel}:${identifier}`;
    const record = identifier && otps.get(key);

    if (!record || record.expiresAt < Date.now()) {
      otps.delete(key);
      return res
        .status(400)
        .json({ error: "OTP expired. Please request a new one." });
    }
    if (record.attempts >= MAX_ATTEMPTS) {
      otps.delete(key);
      return res
        .status(429)
        .json({ error: "Too many attempts. Please request a new OTP." });
    }
    record.attempts += 1;

    const given = hashOtp(key, String(otp ?? "").trim());
    if (
      !crypto.timingSafeEqual(Buffer.from(given), Buffer.from(record.hash))
    ) {
      return res.status(400).json({
        error: `Incorrect OTP. ${MAX_ATTEMPTS - record.attempts} attempts left.`,
      });
    }

    otps.delete(key);

    const userData = users.get(identifier);
    const userName = userData?.name || identifier.split("@")[0];

    const user = { channel, identifier, name: userName };
    const token = signToken({
      ...user,
      exp: Date.now() + TOKEN_TTL_MS,
    });
    res.json({ token, user });
  });

  app.get("/api/auth/me", (req, res) => {
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    const payload = verifyToken(token);
    if (!payload)
      return res.status(401).json({ error: "Not signed in." });
    res.json({
      user: { channel: payload.channel, identifier: payload.identifier, name: payload.name },
    });
  });

  app.post("/api/orders", async (req, res) => {
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    const payload = verifyToken(token);

    if (!payload) {
      return res.status(401).json({ error: "Not signed in" });
    }

    const { customerName, email, phone, address, city, pincode, items, total, paymentMode } = req.body ?? {};

    if (!customerName || !email || !address || !pincode || !items || !total) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderId = `KM-${Date.now()}`;
    const orderData = {
      orderId,
      customerName,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      total,
      paymentMode,
      userId: payload.identifier,
      createdAt: new Date().toISOString(),
    };

    orders.set(orderId, orderData);

    try {
      await sendOrderConfirmationEmail(email, orderData);
      console.log(`[order] confirmed for ${customerName} (${orderId})`);
    } catch (err) {
      console.error("[order] email failed:", err instanceof Error ? err.message : "Unknown error");
    }

    res.json({
      ok: true,
      orderId,
      message: "Order placed successfully! Check your email for confirmation.",
    });
  });

  app.get("/api/contact-info", (req, res) => {
    res.json({
      support: SMTP_USER,
      dispute: "dispute@kisanmitratrading.store",
      phone: "+91 96531 11297",
    });
  });

  app.post("/api/contact/dispute", async (req, res) => {
    const { email, subject, message } = req.body ?? {};

    if (!email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "Email, subject, and message are required." });
    }

    try {
      await transporter.sendMail({
        from: MAIL_FROM,
        to: "dispute@kisanmitratrading.store",
        replyTo: email,
        subject: `[DISPUTE] ${subject} - KisanMitra Trading`,
        text: `KisanMitra Trading\n\nCustomer Email: ${email}\nSubject: ${subject}\n\n${message}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
            <h2 style="color:#1a5d1a;margin:0 0 12px">🌾 KisanMitra Trading - Dispute Report</h2>
            <p style="color:#666;font-size:13px"><strong>From:</strong> ${email}</p>
            <p style="color:#666;font-size:13px"><strong>Subject:</strong> ${subject}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
            <p style="color:#333;white-space:pre-wrap">${message}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:16px 0">
            <p style="color:#999;font-size:11px">© KisanMitra Trading • Premium Rice & Grains</p>
          </div>`,
      });
      res.json({ ok: true });
    } catch (err) {
      console.error(
        "[dispute] send failed:",
        err instanceof Error ? err.message : "Unknown error"
      );
      res
        .status(502)
        .json({
          error: "Could not submit dispute. Please try again later.",
        });
    }
  });

  setInterval(() => {
    const now = Date.now();
    for (const [key, rec] of otps) {
      if (rec.expiresAt < now) otps.delete(key);
    }
  }, 60 * 1000).unref();

  return app;
}

const app = createServer();
app.listen(PORT, () => {
  console.log(`✓ KisanMitra server running on port ${PORT}`);
  console.log(`  Email: ${SMTP_USER}`);
  console.log(`  SMS: ${FAST2SMS_API_KEY ? "Enabled" : "Disabled"}`);
});
