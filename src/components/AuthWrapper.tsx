"use client"

import { useAuth, SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react"

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
  }, [isSignedIn, isLoaded, router])

  if (!isLoaded) {
    return <div>Please wait loading...</div>
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>{children}</SignedOut>
    </>
  )
}

