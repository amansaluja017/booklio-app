import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export interface SessionUser {
  id: string;
  email?: string | null;
  name?: string | null;
  role: string;
  address?: object;
}

export interface Session {
  user: SessionUser;
}

type SessionStatus = "loading" | "authenticated" | "unauthenticated";

interface SessionContextValue {
  data: Session | null;
  status: SessionStatus;
  update: () => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function AuthProvider({
  children,
  refetchInterval = 5 * 60,
}: {
  children: React.ReactNode;
  refetchInterval?: number;
}) {
  const [data, setData] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>("loading");

  const fetchSession = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/session`, { credentials: "include" });
      if (!res.ok) {
        setData(null);
        setStatus("unauthenticated");
        return;
      }
      const json = await res.json();
      if (json?.user) {
        setData({ user: json.user });
        setStatus("authenticated");
      } else {
        setData(null);
        setStatus("unauthenticated");
      }
    } catch {
      setData(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    fetchSession();
    const onLogout = () => fetchSession();
    window.addEventListener("auth:logout", onLogout);
    const id = refetchInterval > 0 ? setInterval(fetchSession, refetchInterval * 1000) : undefined;
    return () => {
      window.removeEventListener("auth:logout", onLogout);
      if (id) clearInterval(id);
    };
  }, [fetchSession, refetchInterval]);

  const value: SessionContextValue = { data, status, update: fetchSession };
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within AuthProvider");
  return ctx;
}

interface SignInOptions {
  email: string;
  password: string;
  role?: string;
  callbackUrl?: string;
  redirect?: boolean;
}

export async function signIn(
  provider: string,
  options?: SignInOptions
): Promise<{ error?: string; url?: string | null; status?: number; ok?: boolean } | undefined> {
  if (provider !== "credentials" || !options?.email || !options?.password) {
    return { error: "Invalid credentials", ok: false };
  }
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: options.email,
        password: options.password,
        role: options.role || "customer",
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { error: json?.error || "Login failed", status: res.status, ok: false };
    }
    return { url: options.callbackUrl || "/", ok: true };
  } catch (err) {
    console.error(err);
    return { error: "Login failed", ok: false };
  }
}

export async function signOut(options?: { callbackUrl?: string }): Promise<void> {
  try {
    await fetch(`${API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
  } catch {
    // ignore
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("auth:logout"));
    if (options?.callbackUrl) {
      window.location.href = options.callbackUrl;
    }
  }
}
