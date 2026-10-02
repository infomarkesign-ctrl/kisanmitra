import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Phone, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, Check } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

type Mode = "login" | "signup";
type Step = "input" | "otp" | "success";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));

export default function LoginPage() {
  const { login, user } = useAuth();
  const [mode, setMode] = useState<Mode>("login");

  // Input state - handles BOTH email and phone
  const [identifier, setIdentifier] = useState("");
  const [channel, setChannel] = useState<"email" | "phone" | null>(null);
  const [step, setStep] = useState<Step>("input");

  // Signup extra fields
  const [name, setName] = useState("");

  // OTP
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [expiresIn, setExpiresIn] = useState(0);

  // Common
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
          <p className="text-gray-600 mt-2">You're already logged in</p>
          <button
            onClick={() => window.location.href = "/"}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Detect if input is email or phone
  const getChannel = (value: string): "email" | "phone" | null => {
    if (isValidEmail(value)) return "email";
    if (isValidPhone(value)) return "phone";
    return null;
  };

  const handleSendOTP = async (loginMode: "login" | "signup" = mode) => {
    const detectedChannel = getChannel(identifier);
    if (!detectedChannel) {
      setError("Enter valid email or 10-digit phone");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          channel: detectedChannel,
          identifier,
          mode: loginMode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setChannel(detectedChannel);
      setExpiresIn(data.expiresIn);
      setStep("otp");

      let countdown = data.expiresIn;
      const interval = setInterval(() => {
        countdown--;
        setExpiresIn(countdown);
        if (countdown <= 0) clearInterval(interval);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupRegister = async () => {
    const detectedChannel = getChannel(identifier);
    if (!detectedChannel || !name.trim()) {
      setError("Enter name and valid email/phone");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const registerBody: any = { name: name.trim() };
      if (detectedChannel === "email") {
        registerBody.email = identifier;
      } else {
        registerBody.phone = identifier;
      }

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(registerBody),
      });

      if (!res.ok) throw new Error("Failed to register");

      // Now send OTP
      await handleSendOTP();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || !channel) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          channel,
          identifier,
          otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      login(data.token, data.user);
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-700">
      <div className="flex min-h-screen">
        {/* Left - Branding */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 text-white">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-4">🌾 KisanMitra</h1>
            <p className="text-2xl text-emerald-100 font-light">Direct from Farmers</p>
          </div>

          <div className="space-y-6">
            {[
              { title: "Premium Quality Rice", desc: "Directly from verified farmers" },
              { title: "Best Prices", desc: "No middlemen, direct pricing" },
              { title: "Fast Delivery", desc: "Same-day delivery available" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-emerald-100">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-emerald-200">© 2024 KisanMitra Trading. All rights reserved.</p>
        </div>

        {/* Right - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-8 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setStep("input");
                    setError("");
                    setIdentifier("");
                    setName("");
                    setOtp("");
                  }}
                  className={`flex-1 py-2 px-4 rounded-md font-semibold transition cursor-pointer ${
                    mode === m
                      ? "bg-white text-emerald-900 shadow-lg"
                      : "text-white hover:text-emerald-100"
                  }`}
                >
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* INPUT STEP */}
            {step === "input" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {mode === "login" ? "Welcome Back" : "Create Account"}
                  </h2>
                  <p className="text-emerald-100 mt-2">
                    {mode === "login" ? "Sign in to your account" : "Join KisanMitra today"}
                  </p>
                </div>

                <div className="space-y-4">
                  {mode === "signup" && (
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email or Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="your@email.com or 9876543210"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                    />
                    <p className="text-xs text-emerald-200 mt-1">
                      💡 Email or 10-digit phone with SMS support
                    </p>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-red-200">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      if (mode === "signup") {
                        handleSignupRegister();
                      } else {
                        handleSendOTP();
                      }
                    }}
                    disabled={
                      isLoading ||
                      !identifier.trim() ||
                      (mode === "signup" && !name.trim())
                    }
                    className="w-full py-3 bg-emerald-400 text-emerald-900 rounded-lg font-bold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {isLoading ? "Processing..." : "Continue"}
                  </button>
                </div>
              </div>
            )}

            {/* OTP STEP */}
            {step === "otp" && (
              <div className="space-y-6">
                <button
                  onClick={() => setStep("input")}
                  className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm font-medium"
                >
                  <ArrowLeft size={16} /> Back
                </button>

                <div>
                  <h2 className="text-2xl font-bold text-white">Verify OTP</h2>
                  <p className="text-emerald-100 mt-2">
                    {channel === "email"
                      ? `Code sent to ${identifier}`
                      : `SMS sent to ${identifier}`}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">
                      6-digit code
                    </label>
                    <div className="relative">
                      <input
                        type={showOtp ? "text" : "password"}
                        placeholder="000000"
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                        }
                        maxLength={6}
                        className="w-full px-4 py-4 text-center text-4xl tracking-[0.5em] font-bold bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                      />
                      <button
                        type="button"
                        onClick={() => setShowOtp(!showOtp)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                      >
                        {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <span className="text-sm font-medium text-emerald-100">Expires in</span>
                    <span
                      className={`font-mono font-bold ${
                        expiresIn < 60 ? "text-red-400" : "text-emerald-400"
                      }`}
                    >
                      {Math.floor(expiresIn / 60)}:{String(expiresIn % 60).padStart(2, "0")}
                    </span>
                  </div>

                  {error && (
                    <div className="flex items-start gap-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-sm text-red-200">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleVerifyOTP}
                    disabled={isLoading || otp.length !== 6}
                    className="w-full py-3 bg-emerald-400 text-emerald-900 rounded-lg font-bold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      mode === "login" ? "Sign In" : "Create Account"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* SUCCESS STEP */}
            {step === "success" && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    {mode === "login" ? "Welcome!" : "Account Created!"}
                  </h2>
                  <p className="text-emerald-100 mt-2">Redirecting you home...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
