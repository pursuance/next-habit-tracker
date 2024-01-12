import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"


const supabase = createClientComponentClient()

export const createNewUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${location.origin}/auth/callback`
    }
  })
}

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
}

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut()
}