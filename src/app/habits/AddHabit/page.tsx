'use client'

import { Form, FormLabel, FormControl, FormField, FormItem, FormDescription, FormMessage } from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { addNewHabit } from '@/lib/supabaseDB'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useHabitStore } from '@/store/HabitStore'

const formSchema = z.object({
  name: z.string().min(2).max(18)
})

export default function Page() {

  const [habits] = useHabitStore((state) => [state.habits])

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const lastHabit: habit | undefined = habits?.reduce((a, b) => 
      (a.order > b.order) ? a : b
    )
    const newHabitOrder: number = lastHabit ? lastHabit.order + 1 : 0
    addNewHabit(values.name, newHabitOrder)
    router.push('/habits')
  }

  return (
    <div className='flex justify-center my-10'>
      <Card className='flex-col justify-center max-w-md'>
        <CardHeader>
          <CardTitle>Add a New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Habit name...' {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between mt-6'>
                <Link href='/habits'>
                    <Button type='button' variant='secondary'>Cancel</Button>
                </Link>
                <Button type='submit'>Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}