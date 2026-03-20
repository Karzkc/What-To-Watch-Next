"use client"

import { AuthProvider } from "./AuthProvider"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}