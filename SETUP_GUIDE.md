# KisanMitra Trading - Authentication & Order System Setup

## ✨ Features Implemented

### 🔐 Professional OTP Authentication (Flipkart-like)
- **Email + SMS OTP** - Dual channel verification
- **Real-time Validation** - Email format checking
- **OTP Timer** - 5-minute expiration with color warning
- **Resend Cooldown** - 30-second rate limiting
- **Max Attempts** - 5 attempts before OTP reset
- **JWT Token** - Secure HMAC-SHA256 signing

### 📧 Email Integration
- **Titan Email SMTP** - secureserver.titan.email
- **Account** - support@kisanmitratrading.store
- **Password** - Kisan@1515
- **HTML Templates** - Professional order confirmations

### 📱 SMS Integration
- **Fast2SMS** - Quick SMS (route 'q')
- **API Key** - Auto-configured from .env
- **No DLT** - Uses quick route for instant delivery

### 🛒 Order Management
- **Login Required** - Checkout needs authentication
- **Order Confirmation Email** - Detailed itemized receipt
- **Order ID Generation** - Format: KM-{timestamp}
- **Customer Details** - Name, email, phone, address

### 🎨 Professional UI
- **Flipkart-inspired Design** - Modern, clean interface
- **Gradient Background** - Emerald/teal theme
- **Split Screen Layout** - Branding + auth form
- **Smooth Animations** - Professional transitions
- **Responsive Design** - Mobile-friendly

## 📁 Project Structure

```
KisanMitraRice-main/
├── server/                    # Express.js backend
│   ├── index.ts              # OTP & order endpoints
│   └── package.json          # Server dependencies
├── src/
│   ├── pages/
│   │   └── LoginPage.tsx      # Professional auth UI
│   ├── context/
│   │   └── AuthContext.tsx    # Auth state management
│   └── App.tsx               # Updated with auth
├── .env                       # Configuration
└── SETUP_GUIDE.md            # This file
```

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:3003
```

### 2. Frontend Setup

```bash
# Install dependencies (if needed)
npm install

# Start dev server
npm run dev
# Frontend runs on http://localhost:5173
```

### 3. Environment Configuration

The `.env` file is already configured:

```env
# Server Port
PORT=3003

# SMTP (Titan Email)
SMTP_HOST=secureserver.titan.email
SMTP_PORT=465
SMTP_USER=support@kisanmitratrading.store
SMTP_PASS=Kisan@1515
MAIL_FROM="KisanMitra Trading <support@kisanmitratrading.store>"

# Fast2SMS
FAST2SMS_API_KEY=1xHrzIeuvd8bXLBlQitqcSJOE96T35hpwAysVjK0ngNWmD4UCaxISBRgez1aQYi3hCrWlycqXZ7F5OUP

# Auth
AUTH_SECRET=kisanmitra-secret-key-2024-xyz789abc

# API
VITE_API_URL=http://localhost:3003
```

## 📡 API Endpoints

### Authentication

**Send OTP**
```bash
POST /api/auth/send-otp
Content-Type: application/json

{
  "channel": "email|phone",
  "identifier": "user@example.com|9876543210"
}

Response: { ok: true, expiresIn: 300, resendIn: 30 }
```

**Verify OTP**
```bash
POST /api/auth/verify-otp
Content-Type: application/json

{
  "channel": "email|phone",
  "identifier": "user@example.com|9876543210",
  "otp": "123456"
}

Response: { token: "...", user: { channel, identifier, name } }
```

**Register User**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}

Response: { ok: true, message: "User registered successfully" }
```

### Orders

**Place Order**
```bash
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "address": "123 Main St",
  "city": "Mumbai",
  "pincode": "400001",
  "items": [
    { "name": "Basmati Rice", "quantity": 5, "price": 500 },
    { "name": "Pearl Millet", "quantity": 2, "price": 300 }
  ],
  "total": 3100,
  "paymentMode": "Cash on Delivery"
}

Response: { ok: true, orderId: "KM-1234567890", message: "Order placed successfully!" }
```

## 🔑 Key Features

### OTP Lifecycle
1. **Request** - User enters email/phone
2. **Send** - OTP generated and sent via email or SMS
3. **Validate** - Real-time 6-digit input validation
4. **Verify** - Backend verifies with HMAC-SHA256 hash
5. **Token** - JWT token issued for session

### Email Flow
1. OTP Email - 5-minute validity, styled HTML template
2. Order Confirmation - Itemized receipt with order details
3. Professional Branding - KisanMitra logo and footer

### Security
- **Token Signing** - HMAC-SHA256 with AUTH_SECRET
- **Timing Attack Prevention** - timingSafeEqual for OTP comparison
- **Rate Limiting** - 30-second resend cooldown, 5 max attempts
- **HTTPS** - Production should use SSL/TLS

## 🎯 Login/Signup Flows

### Sign In
1. Enter email → 2. Choose channel (Email/SMS) → 3. Enter OTP → 4. Success

### Sign Up
1. Enter name + email → 2. Receive OTP → 3. Verify → 4. Account created

## 📧 Email Templates

### OTP Email
- Subject: "XXXXXX is your KisanMitra login code"
- Styled HTML with KisanMitra branding
- 5-minute validity notice
- Support email footer

### Order Confirmation
- Order ID, date, customer details
- Itemized product table
- Delivery address
- Payment method
- Professional footer

## 🔐 Security Notes

1. **Never commit credentials** - .env is in .gitignore
2. **Production HTTPS** - Use SSL certificates
3. **Token expiry** - 30 days by default
4. **CORS** - Configured for development
5. **Nodemailer** - Uses TLS encryption

## 🚀 Deployment

### Backend
```bash
# Build
npm run build

# Start
npm start
```

### Frontend
```bash
# Build
npm run build

# Serve dist/ folder
# Update VITE_API_URL in .env to production server
```

## 📱 Testing

### Sign In
1. Go to `/login`
2. Toggle to "Sign In"
3. Enter email: `test@example.com`
4. Choose "Email" OTP
5. Check email for OTP
6. Enter OTP code

### Sign Up
1. Go to `/login`
2. Toggle to "Sign Up"
3. Enter name and email
4. Verify email with OTP

### Order Placement
1. Login to account
2. Add items to cart
3. Go to checkout
4. Place order (requires login)
5. Check email for confirmation

## ⚙️ Configuration

### Change Email Address
Edit `.env`:
```env
SMTP_USER=your-email@yourserver.com
SMTP_PASS=your-password
```

### Change SMS Provider
Update `server/index.ts` in `sendSmsOtp()` function to use different provider.

### Customize Branding
Edit `LoginPage.tsx` - Replace "KisanMitra" text and colors.

## 📞 Support

- Email: support@kisanmitratrading.store
- SMS: Fast2SMS integration active
- Errors logged to console for debugging

## ✅ Checklist

- [x] OTP authentication (email + SMS)
- [x] Professional UI (Flipkart-like)
- [x] Email integration (Titan SMTP)
- [x] SMS integration (Fast2SMS)
- [x] Order confirmation emails
- [x] JWT token management
- [x] Login-required checkout
- [x] User registration
- [x] Real-time validation
- [x] Professional styling
- [x] Responsive design

---

**Last Updated:** 2024-10-02
**Version:** 1.0.0
**Status:** ✅ Production Ready
