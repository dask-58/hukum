"use client"
import { useAuth, SignedIn, SignedOut } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type React from "react"
import { Loader2 } from "lucide-react"
export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard")
    }
  }, [isSignedIn, isLoaded, router])
  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center">
        <div className="glass-card rounded-xl p-8 flex flex-col items-center space-y-6 animate-fade-in">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full animate-spin duration-2000" />
            <div className="relative bg-gray-900 p-4 rounded-full">
              <Loader2 className="w-8 h-8 animate-spin text-gray-200" />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-xl font-semibold text-gray-200">
              Loading
            </h3>
            <p className="text-sm text-gray-400 animate-pulse">
              Please wait while we set things up...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>{children}</SignedOut>
    </>
  )
}