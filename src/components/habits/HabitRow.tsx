'use client'

import { TableRow, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { useHabitStore, useDateStore } from "@/store/HabitStore"
import { updateDatesCompleted } from '@/lib/supabaseDB'
import HabitOptions from '../HabitOptions'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Grip } from 'lucide-react'
import { Button } from '../ui/button'

interface RowProps {
  habit: habit;
  days: Date[];
}

interface SquareProps {
  date: Date;
  dates_completed: string[];
}

export default function HabitRow({ habit, days }: RowProps) {

  const { id, name, dates_completed, order} = habit

  const [numOfDays] = useDateStore((state) => [
    state.numOfDays,
  ])

  const [habits, setHabits] = useHabitStore((state) => [
    state.habits, state.setHabits
  ])

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const draggableStyle = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  const HabitSquare = ({ date, dates_completed }: SquareProps) => {

    const formattedDate = format(date, 'MM/dd/y')

    const isCompleted = () => dates_completed?.includes(formattedDate)
    
    const handleCheckedChange = (checked: boolean) => {
      checked ?
        dates_completed = [formattedDate, ...dates_completed]
        :
        dates_completed = dates_completed.filter((date) => date !== formattedDate)

      const updatedhabit: habit = { id, name, dates_completed, order }
      
      const updatedHabits = habits?.map((habit) => {
        if (habit.id === updatedhabit.id) {
          return {...habit, dates_completed}
        } else return habit
      })

      updatedHabits && updateDatesCompleted(updatedhabit)
      updatedHabits && setHabits(updatedHabits)
    }

    return (
      <TableCell className='w-min'>
        <Checkbox className='h-7 w-7' checked={isCompleted()} onCheckedChange={handleCheckedChange}/>
      </TableCell>
    )
  }

  const HabitSquares = new Array(numOfDays).fill(undefined).map((_,index) =>
    <HabitSquare key={index} date={days[index]} dates_completed={dates_completed} />
  )
  
  
  return (
    <TableRow ref={setNodeRef} style={draggableStyle}>
      <TableCell className='flex items-center'>
        <Button variant='ghost' className='h-8 w-8 p-0' {...attributes} {...listeners}>
          <Grip className='h-4 w-4'/>
        </Button>
        {name}
      </TableCell>
      {HabitSquares}
      <TableCell>
        <HabitOptions id={id}/>
      </TableCell>
    </TableRow>
  )
}