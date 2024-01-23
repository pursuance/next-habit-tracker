import { SignInForm } from "@/components/auth/SignInForm";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

  const supabase = createServerComponentClient({ cookies })
  const { data: {session}} = await supabase.auth.getSession()

  if (session) redirect('/habits')

  return (
    <>
      <SignInForm />
    </>
  )
}
