"use client";
import React, { useEffect, useState } from "react";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string) => Promise<string>;
      render: (element: string | HTMLElement, options: any) => number;
      reset: (widgetId?: number) => void;
    };
  }
}

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  // Check if running locally
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  const isLogedIn = wixClient.auth.loggedIn();
  if (isLogedIn) {
    router.push("/");
  }

  const [mode, setMode] = useState(MODE.LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [widgetId, setWidgetId] = useState<number>();
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Welcome Back"
      : mode === MODE.REGISTER
      ? "Create Account"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : "Verify Email";

  const formSubtitle =
    mode === MODE.LOGIN
      ? "Please enter your details to sign in"
      : mode === MODE.REGISTER
      ? "Please fill in your information"
      : mode === MODE.RESET_PASSWORD
      ? "Enter your email to reset password"
      : "Enter the verification code sent to your email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Sign in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Password"
      : "Verify";

  useEffect(() => {
    // Skip reCAPTCHA initialization if running locally
    if (isLocalhost) return;

    const initRecaptcha = () => {
      if (!window.grecaptcha) return;

      try {
        window.grecaptcha.ready(() => {
          const id = window.grecaptcha.render("recaptcha-container", {
            sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            callback: (token: string) => {
              setCaptchaToken(token);
            },
            "expired-callback": () => {
              setCaptchaToken("");
            },
          });
          setWidgetId(id);
        });
      } catch (err) {
        console.error("Error initializing reCAPTCHA:", err);
        setError("Failed to load verification. Please refresh the page.");
      }
    };

    if (window.grecaptcha) {
      initRecaptcha();
    } else {
      const checkRecaptcha = setInterval(() => {
        if (window.grecaptcha) {
          clearInterval(checkRecaptcha);
          initRecaptcha();
        }
      }, 100);

      return () => clearInterval(checkRecaptcha);
    }

    return () => {
      if (window.grecaptcha && widgetId) {
        window.grecaptcha.reset(widgetId);
      }
    };
  }, [isLocalhost]);

  useEffect(() => {
    if (!isLocalhost && window.grecaptcha && widgetId) {
      window.grecaptcha.reset(widgetId);
      setCaptchaToken("");
    }
  }, [mode, widgetId, isLocalhost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!isLocalhost && !captchaToken && mode !== MODE.EMAIL_VERIFICATION) {
      setError("Please complete the CAPTCHA verification.");
      setIsLoading(false);
      return;
    }

    try {
      let response;
      const captchaTokens = isLocalhost
        ? undefined
        : { recaptchaToken: captchaToken };

      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
            captchaTokens,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
            captchaTokens,
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Successful! You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
          if (!isLocalhost && window.grecaptcha && widgetId) {
            window.grecaptcha.reset(widgetId);
            setCaptchaToken("");
          }
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
          break;
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      if (!isLocalhost && window.grecaptcha && widgetId) {
        window.grecaptcha.reset(widgetId);
        setCaptchaToken("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{formTitle}</h2>
          <p className="text-gray-600 mt-2">{formSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {!isLocalhost && mode !== MODE.EMAIL_VERIFICATION && (
              <div
                id="recaptcha-container"
                className="flex justify-center my-4"
              ></div>
            )}
            {mode === MODE.REGISTER && (
              <div className="relative">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="johndoe"
                    required
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            )}

            {mode !== MODE.EMAIL_VERIFICATION && (
              <div className="relative">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="name@example.com"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            )}

            {mode === MODE.EMAIL_VERIFICATION && (
              <div className="relative">
                <label
                  htmlFor="verificationCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Verification Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="verificationCode"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter verification code"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                </div>
              </div>
            )}

            {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
              <div className="relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {mode === MODE.LOGIN && (
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setMode(MODE.RESET_PASSWORD)}
                className="text-sm font-medium text-red-500 hover:text-red-600"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 disabled:bg-red-300 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : buttonTitle}
          </button>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          {message && (
            <div className="text-green-500 text-sm text-center">{message}</div>
          )}

          <div className="text-center text-sm text-gray-600">
            {mode === MODE.LOGIN ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode(MODE.REGISTER)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </button>
              </>
            ) : mode === MODE.REGISTER ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode(MODE.LOGIN)}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setMode(MODE.LOGIN)}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to sign in
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
