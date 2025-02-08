"use client"

import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <SignIn
        routing="hash"
        forceRedirectUrl="/dashboard"
      />
    </div>
  )
}
