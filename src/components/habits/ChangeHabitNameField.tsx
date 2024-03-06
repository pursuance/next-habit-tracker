import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHabitStore } from "@/store/HabitStore";
import { Button } from "../ui/button";
import { renameHabitinDB } from "@/lib/supabaseDB";
import { Ban, Check } from "lucide-react";

interface Props {
  habit: habit;
}

export default function ChangeHabitNameField({ habit }: Props) {

  const { id, name } = habit

  const [habits, setHabits] = useHabitStore((state) => [
    state.habits, state.setHabits
  ])

  const formSchema = z.object({
    name: z.string().min(2).max(18)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const updatedHabits = habits?.map((habit) => {
      if (id === habit.id) {
        return {...habit, name: values.name, editable: false}
      } else return habit
    })

    updatedHabits && renameHabitinDB(habit.id, values.name)
    updatedHabits && setHabits(updatedHabits)
  }

  const handleClose = () => {
    const updateHabits = habits?.map((habit) => {
      if (id === habit.id) {
        return {...habit, editable: false}
      } else return habit
    })

    updateHabits && setHabits(updateHabits)
  }

  return (
    <Form {...form}>
      <form  onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex ">
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter habit name..." {...field} className=""/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button className='px-2' type='submit' variant='ghost'>
            <Check />
          </Button>
          <Button className='px-2' onClick={handleClose} variant='ghost'>
            <Ban color='red'/>
          </Button>
        </div>
      </form>
    </Form>
  )
}