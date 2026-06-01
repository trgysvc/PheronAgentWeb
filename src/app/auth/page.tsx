"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!email || !password) {
      setMessage({ text: "Please fill in all fields.", type: "error" });
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    // Mock successful authentication
    setMessage({ 
      text: isSignUp 
        ? "Account verification email sent! Check your inbox to complete Supabase onboarding." 
        : "Successfully signed in via Supabase Auth!", 
      type: "success" 
    });
  };

  const handleOAuthLogin = (provider: "Apple" | "Google") => {
    // Mock Supabase OAuth popup trigger
    setMessage({ 
      text: `Redirecting to Supabase OAuth portal for ${provider} Login...`, 
      type: "success" 
    });
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to home
      </Link>

      <div className={`${styles.card} glass-card`}>
        <div className={styles.cardHeader}>
          <Image 
            src="/assets/logo.png" 
            alt="Pheron Logo" 
            width={48} 
            height={48} 
            className={styles.logoImg}
          />
          <h1 className={styles.title}>
            {isSignUp ? "Create an account" : "Welcome back"}
          </h1>
          <p className={styles.subtitle}>
            {isSignUp 
              ? "Start managing your local macOS agent subscription" 
              : "Access your Pheron Agent cloud configurations"
            }
          </p>
        </div>

        {/* OAuth Buttons (Supabase Auth Mock) */}
        <div className={styles.ssoContainer}>
          <button 
            type="button" 
            className={`${styles.ssoBtn} ${styles.btnApple}`}
            onClick={() => handleOAuthLogin("Apple")}
          >
            <svg className={styles.socialIcon} viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.84-14.3-5.9-3.58-2.83-7.5-7.66-11.75-14.53-8.61-13.9-15.02-30.88-19.23-50.96-2.58-12.35-3.87-24-3.87-34.98 0-16.14 3.87-29.21 11.62-39.22 7.74-10.02 17.5-15.15 29.27-15.4 5.37-.12 11.02 1.63 16.94 5.25 5.92 3.63 9.94 5.44 12.06 5.44 1.79 0 5.44-1.5 10.96-4.5 5.51-3 10.9-4.57 16.16-4.7 11.96-.13 22.01 4.22 30.15 13.06 6.04 6.57 10.37 14.53 13 23.86-13.5 8.16-20.12 18.91-19.87 32.26.25 10.39 4.17 19.1 11.75 26.13 7.58 7.03 16.42 11 26.54 11.9-2.61 7.62-5.78 15.17-9.5 22.65zM119.22 30.3c0-7.85 2.8-15.34 8.4-22.5 7.64-9.39 16.94-14.3 27.9-14.7 1.06 8.36-1.92 16.32-8.94 23.87-7.02 7.55-15.82 12.22-26.4 13.01-.63-.94-.96-1.74-.96-2.68z" />
            </svg>
            Sign in with Apple
          </button>
          
          <button 
            type="button" 
            className={`${styles.ssoBtn} ${styles.btnGoogle}`}
            onClick={() => handleOAuthLogin("Google")}
          >
            <svg className={styles.socialIcon} viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24c0-1.63-.15-3.2-.43-4.75H24v9h12.75c-.55 2.94-2.2 5.43-4.7 7.11l7.3 5.66C43.6 36.87 46.5 31.06 46.5 24z"/>
              <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.3-5.66c-2.2 1.47-5.01 2.47-8.59 2.47-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span>or email</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email Address</label>
            <input 
              type="email" 
              className={styles.input} 
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              className={styles.input} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {isSignUp && (
            <div className={styles.inputGroup}>
              <label className={styles.label}>Confirm Password</label>
              <input 
                type="password" 
                className={styles.input} 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={isSignUp}
              />
            </div>
          )}

          <button type="submit" className="btn-primary styles.submitBtn">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Feedback Message */}
        {message && (
          <div 
            style={{ 
              fontSize: "14px", 
              color: message.type === "success" ? "var(--color-cyan)" : "#ef4444",
              background: message.type === "success" ? "rgba(0, 242, 254, 0.05)" : "rgba(239, 68, 68, 0.05)",
              border: `1px solid ${message.type === "success" ? "var(--color-cyan)" : "#ef4444"}`,
              padding: "12px",
              borderRadius: "8px",
              lineHeight: "1.4"
            }}
          >
            {message.text}
          </div>
        )}

        <div className={styles.toggleAuth}>
          {isSignUp ? (
            <span>
              Already have an account?{" "}
              <span className={styles.toggleAuthSpan} onClick={() => { setIsSignUp(false); setMessage(null); }}>
                Sign In
              </span>
            </span>
          ) : (
            <span>
              Don&apos;t have an account?{" "}
              <span className={styles.toggleAuthSpan} onClick={() => { setIsSignUp(true); setMessage(null); }}>
                Sign Up
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
