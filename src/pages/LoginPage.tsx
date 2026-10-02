import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Mail, Phone, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, Check } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3003";

type Mode = "login" | "signup";
type LoginStep = "email" | "otp-choice" | "otp" | "success";
type SignupStep = "name-email" | "otp" | "success";
type Channel = "email" | "phone" | null;

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone: string) => /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""));

export default function LoginPage() {
  const { login, user } = useAuth();
  const [mode, setMode] = useState<Mode>("login");

  // Login state
  const [loginStep, setLoginStep] = useState<LoginStep>("email");
  const [loginEmail, setLoginEmail] = useState("");
  const [otpChannel, setOtpChannel] = useState<Channel>(null);

  // Signup state
  const [signupStep, setSignupStep] = useState<SignupStep>("name-email");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");

  // OTP state
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

  const handleSendOTP = async () => {
    if (!otpChannel) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          channel: otpChannel,
          identifier: otpChannel === "email" ? loginEmail : loginEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");

      setExpiresIn(data.expiresIn);
      setLoginStep("otp");

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

  const handleVerifyLoginOTP = async () => {
    if (!otp || !otpChannel) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          channel: otpChannel,
          identifier: loginEmail,
          otp,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to verify OTP");

      login(data.token, data.user);
      setLoginStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupNameEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !isValidEmail(signupEmail)) return;

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: signupName, email: signupEmail }),
      });

      if (!res.ok) throw new Error("Failed to register");

      await handleSendSignupOTP();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to register");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSignupOTP = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel: "email", identifier: signupEmail }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setExpiresIn(data.expiresIn);
      setSignupStep("otp");

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

  const handleVerifySignupOTP = async () => {
    if (!otp) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ channel: "email", identifier: signupEmail, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      login(data.token, data.user);
      setSignupStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-700">
      <div className="flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 text-white">
          <div>
            <h1 className="text-5xl font-black tracking-tight mb-4">🌾 KisanMitra</h1>
            <p className="text-2xl text-emerald-100 font-light">Direct from Farmers</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Premium Quality Rice</h3>
                <p className="text-emerald-100">Directly from verified farmers</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Best Prices</h3>
                <p className="text-emerald-100">No middlemen, direct pricing</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Fast Delivery</h3>
                <p className="text-emerald-100">Same-day delivery available</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-emerald-200">© 2024 KisanMitra Trading. All rights reserved.</p>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-8 bg-white/10 p-1 rounded-lg backdrop-blur-sm">
              {(["login", "signup"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => {
                    setMode(m);
                    setLoginStep("email");
                    setSignupStep("name-email");
                    setError("");
                    setLoginEmail("");
                    setSignupName("");
                    setSignupEmail("");
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

            {/* LOGIN FLOW */}
            {mode === "login" && (
              <>
                {loginStep === "email" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                      <p className="text-emerald-100 mt-2">Sign in to your account</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-red-200">{error}</p>
                        </div>
                      )}

                      <button
                        onClick={() => setLoginStep("otp-choice")}
                        disabled={isLoading || !isValidEmail(loginEmail)}
                        className="w-full py-3 bg-emerald-400 text-emerald-900 rounded-lg font-bold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {isLoading ? "Processing..." : "Continue"}
                      </button>
                    </div>
                  </div>
                )}

                {loginStep === "otp-choice" && (
                  <div className="space-y-6">
                    <button
                      onClick={() => setLoginStep("email")}
                      className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm font-medium"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
                      <p className="text-emerald-100 mt-2">Choose how to receive your OTP</p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setOtpChannel("email");
                          handleSendOTP();
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center gap-4 p-4 border-2 border-white/20 rounded-lg hover:border-emerald-400 hover:bg-white/5 transition disabled:opacity-50"
                      >
                        <Mail className="w-6 h-6 text-emerald-400" />
                        <div className="text-left flex-1">
                          <p className="font-semibold text-white">Email</p>
                          <p className="text-sm text-emerald-100">{loginEmail}</p>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setOtpChannel("phone");
                          handleSendOTP();
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center gap-4 p-4 border-2 border-white/20 rounded-lg hover:border-emerald-400 hover:bg-white/5 transition disabled:opacity-50"
                      >
                        <Phone className="w-6 h-6 text-emerald-400" />
                        <div className="text-left flex-1">
                          <p className="font-semibold text-white">SMS</p>
                          <p className="text-sm text-emerald-100">Verify via SMS</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {loginStep === "otp" && (
                  <div className="space-y-6">
                    <button
                      onClick={() => setLoginStep("otp-choice")}
                      className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm font-medium"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-white">Enter OTP</h2>
                      <p className="text-emerald-100 mt-2">
                        We sent a code to your {otpChannel === "email" ? "email" : "phone"}
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
                        onClick={handleVerifyLoginOTP}
                        disabled={isLoading || otp.length !== 6}
                        className="w-full py-3 bg-emerald-400 text-emerald-900 rounded-lg font-bold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {loginStep === "success" && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Welcome!</h2>
                      <p className="text-emerald-100 mt-2">Redirecting you home...</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* SIGNUP FLOW */}
            {mode === "signup" && (
              <>
                {signupStep === "name-email" && (
                  <form onSubmit={handleSignupNameEmail} className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-white">Create Account</h2>
                      <p className="text-emerald-100 mt-2">Join KisanMitra today</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30"
                        />
                      </div>

                      {error && (
                        <div className="flex items-start gap-3 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                          <AlertCircle className="w-5 h-5 text-red-400" />
                          <p className="text-sm text-red-200">{error}</p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || !signupName.trim() || !isValidEmail(signupEmail)}
                        className="w-full py-3 bg-emerald-400 text-emerald-900 rounded-lg font-bold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      >
                        {isLoading ? "Processing..." : "Continue"}
                      </button>
                    </div>
                  </form>
                )}

                {signupStep === "otp" && (
                  <div className="space-y-6">
                    <button
                      onClick={() => {
                        setSignupStep("name-email");
                        setError("");
                      }}
                      className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 text-sm font-medium"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-white">Verify Email</h2>
                      <p className="text-emerald-100 mt-2">Enter the code sent to {signupEmail}</p>
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
                        onClick={handleVerifySignupOTP}
                        disabled={isLoading || otp.length !== 6}
                        className="w-full py-3 bg-emerald-400 text-emerald-900 rounded-lg font-bold hover:bg-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Create Account"
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {signupStep === "success" && (
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8 text-green-400" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white">Account Created!</h2>
                      <p className="text-emerald-100 mt-2">Welcome to KisanMitra, {signupName}</p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
