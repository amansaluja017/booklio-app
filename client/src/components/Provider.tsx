"use client";

import { AuthProvider } from "@/lib/auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider refetchInterval={5 * 60}>{children}</AuthProvider>;
}
