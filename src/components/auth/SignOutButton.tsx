'use client'

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function SignOutButton() {

  const supabase = createClientComponentClient()
  const router = useRouter()

  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut()
    router.push('/')
  }

  const handleClick = () => {
    signOutUser()
  }

  return (
    <Button onClick={handleClick}>Sign Out</Button>
  )
}