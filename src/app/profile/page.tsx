"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

interface License {
  id: string;
  license_key: string;
  instance_id: string;
  mac_name: string | null;
  activated_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      if (error || !session?.user) {
        router.replace("/auth");
        return;
      }

      setUser(session.user);

      const { data } = await supabase
        .from("user_licenses")
        .select("id, license_key, instance_id, mac_name, activated_at")
        .eq("user_id", session.user.id)
        .order("activated_at", { ascending: false });

      setLicenses(data ?? []);
      setLoading(false);
    });
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  // Apple private relay emails aren't meaningful — show "Pheron User" as fallback
  const isPrivateRelay = user.email?.includes("privaterelay.appleid.com");
  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    (isPrivateRelay ? "Pheron User" : user.email?.split("@")[0]) ||
    "Pheron User";

  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const hasLicense = licenses.length > 0;
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/" className={styles.backLink}>← Back to home</Link>
        <Image src="/assets/PheronAgentLOGO2.png" alt="Pheron Agent" width={28} height={28} style={{ opacity: 0.7 }} />
      </div>

      <div className={styles.content}>
        {/* Identity */}
        <div className={styles.identityCard}>
          {avatarUrl ? (
            <Image src={avatarUrl} alt={displayName} width={72} height={72} className={styles.avatarImg} />
          ) : (
            <div className={styles.avatar}>{initials}</div>
          )}
          <div className={styles.identityInfo}>
            <span className={styles.userName}>{displayName}</span>
            <span className={styles.userEmail}>{user.email}</span>
            <span className={styles.providerBadge}>
              <svg width="12" height="12" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.37.13-9.13-1.84-14.3-5.9-3.58-2.83-7.5-7.66-11.75-14.53-8.61-13.9-15.02-30.88-19.23-50.96-2.58-12.35-3.87-24-3.87-34.98 0-16.14 3.87-29.21 11.62-39.22 7.74-10.02 17.5-15.15 29.27-15.4 5.37-.12 11.02 1.63 16.94 5.25 5.92 3.63 9.94 5.44 12.06 5.44 1.79 0 5.44-1.5 10.96-4.5 5.51-3 10.9-4.57 16.16-4.7 11.96-.13 22.01 4.22 30.15 13.06 6.04 6.57 10.37 14.53 13 23.86-13.5 8.16-20.12 18.91-19.87 32.26.25 10.39 4.17 19.1 11.75 26.13 7.58 7.03 16.42 11 26.54 11.9-2.61 7.62-5.78 15.17-9.5 22.65zM119.22 30.3c0-7.85 2.8-15.34 8.4-22.5 7.64-9.39 16.94-14.3 27.9-14.7 1.06 8.36-1.92 16.32-8.94 23.87-7.02 7.55-15.82 12.22-26.4 13.01-.63-.94-.96-1.74-.96-2.68z" />
              </svg>
              Signed in with Apple
            </span>
          </div>
        </div>

        {/* Subscription */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Subscription</p>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Plan</span>
            <span className={styles.rowValue}>{hasLicense ? "Pheron Agent Pro" : "Free"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Status</span>
            <span className={`${styles.badge} ${hasLicense ? styles.badgeActive : styles.badgeInactive}`}>
              <span className={styles.dot} />
              {hasLicense ? "Active" : "No license"}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Member since</span>
            <span className={styles.rowValue}>{joinedDate}</span>
          </div>
        </div>

        {/* Licenses */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>License Keys</p>
          {hasLicense ? (
            licenses.map((lic) => (
              <div key={lic.id} style={{ marginBottom: licenses.length > 1 ? "16px" : 0 }}>
                <div className={styles.licenseRow}>
                  <span className={styles.licenseKey}>{lic.license_key}</span>
                  <button className={styles.copyBtn} onClick={() => handleCopy(lic.license_key)}>
                    {copiedKey === lic.license_key ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div style={{ display: "flex", gap: "16px", marginTop: "8px", paddingLeft: "4px" }}>
                  {lic.mac_name && (
                    <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
                      📍 {lic.mac_name}
                    </span>
                  )}
                  <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                    Activated {new Date(lic.activated_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.row} style={{ borderBottom: "none", paddingTop: 0 }}>
              <span className={styles.rowLabel}>No license key found.</span>
              <Link href="/pricing" style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-cyan)" }}>
                Get a license →
              </Link>
            </div>
          )}
        </div>

        {/* Devices */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>Devices</p>
          {hasLicense ? (
            licenses.map((lic, i) => (
              <div key={lic.id} className={styles.row} style={i === licenses.length - 1 ? { borderBottom: "none" } : {}}>
                <span className={styles.rowLabel}>{lic.mac_name ?? `Device ${i + 1}`}</span>
                <span className={`${styles.badge} ${styles.badgeActive}`}>
                  <span className={styles.dot} /> Active
                </span>
              </div>
            ))
          ) : (
            <div className={styles.row} style={{ borderBottom: "none", paddingTop: 0 }}>
              <span className={styles.rowLabel}>No active devices</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actionsCard}>
          <button className={styles.actionBtn} onClick={() => router.push("/pricing")}>
            <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Manage Subscription
          </button>
          <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} onClick={handleSignOut}>
            <svg className={styles.actionIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
