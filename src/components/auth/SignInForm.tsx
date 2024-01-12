'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { Button } from "../ui/button"
import { signInUser } from "@/lib/supabaseAuth"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().min(4).max(50),
  password: z.string().min(2).max(18)
})

export function SignInForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const router = useRouter()

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { email, password } = values
    signInUser(email, password)
    router.push('/habits')
  }

  return(
    <div className="flex-col justify-center">
      <h1 className='mb-8'>Sign In</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder='email' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create Password</FormLabel>
                <FormControl>
                  <Input placeholder='password' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </div>  
  )
}