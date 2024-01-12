'use client'

import { Form, FormLabel, FormControl, FormField, FormItem, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { addNewHabit } from '@/lib/supabaseDB'
import { useHabitStore } from '@/store/HabitStore'
import { DialogHeader, DialogTitle } from '../ui/dialog'
import { DialogClose } from '@radix-ui/react-dialog'

const formSchema = z.object({
  name: z.string().min(2).max(18)
})

export default function Page() {

  const [habits, getHabitsState] = useHabitStore((state) => [
    state.habits, state.getHabitsState
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (habits && habits.length !== 0) {
      const lastHabit: habit | undefined = habits?.reduce((a, b) => 
        (a.order > b.order) ? a : b
      )
      const newHabitOrder: number = lastHabit.order + 1
      addNewHabit(values.name, newHabitOrder)
    } else {
      addNewHabit(values.name, 0)
    }
    getHabitsState()
  }

  return (
    <div className='flex-col justify-center'>
        <DialogHeader className='mb-8'>
          <DialogTitle>Add a New Habit</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField 
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Enter Habit name...' {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-between mt-6'>
              <DialogClose>
                  <Button type='button' variant='secondary'>Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button type='submit'>Submit</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
        
    </div>
  )
}