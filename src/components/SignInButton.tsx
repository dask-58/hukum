"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function SignInButton() {
  const router = useRouter()

  return <Button onClick={() => router.push("/sign-in")}>Sign In</Button>
}

