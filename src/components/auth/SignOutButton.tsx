'use client'

import { Button } from "@/components/ui/button"
import { signOutUser } from "@/lib/supabaseAuth"

export default function SignOutButton() {
  return (
    <Button onClick={() => signOutUser()}>Sign Out</Button>
  )
}