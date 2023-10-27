'use client'

import { TableRow, TableCell } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { format } from 'date-fns'
import { useHabitStore, useDateStore } from "@/store/HabitStore"
import { updateDatesCompleted } from '@/lib/supabaseDB'
import HabitOptions from '../HabitOptions'

interface RowProps {
  id: string;
  name: string;
  dates_completed: string[];
  days: Date[];
  order: number;
}

interface SquareProps {
  date: Date;
  dates_completed: string[];
}

export default function HabitRow({ id, name, dates_completed, days, order }: RowProps) {

  const [numOfDays] = useDateStore((state) => [
    state.numOfDays,
  ])

  const [habits, setHabits] = useHabitStore((state) => [
    state.habits, state.setHabits
  ])

  const HabitSquare = ({ date, dates_completed }: SquareProps) => {

    const formattedDate = format(date, 'MM/dd/y')

    const isCompleted = () => {
      return dates_completed?.includes(formattedDate)
    }

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
    <TableRow>
      <TableCell>
        {name}
      </TableCell>
      {HabitSquares}
      <TableCell>
        <HabitOptions id={id}/>
      </TableCell>
    </TableRow>
  )
}