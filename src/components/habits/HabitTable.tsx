'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format, isToday, sub } from 'date-fns'
import HabitRow from "./HabitRow"
import { useHabitStore, useDateStore } from "@/store/HabitStore"
import { useEffect } from 'react'
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function HabitTable() {

  const [numOfDays, startDate, increaseStartDate, decreaseStartDate] = useDateStore((state) => [
    state.numOfDays, state.startDate, state.increaseStartDate, state.decreaseStartDate
  ])

  const days = new Array(numOfDays).fill(undefined).map((_, index) => 
    sub(startDate, { days: index })
  )

  const [habits, getHabitsState] = useHabitStore((state) => [
    state.habits, state.getHabitsState,
  ])

  useEffect(() => {
    getHabitsState()
  }, [getHabitsState])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Habit</TableHead>
          {
            days.map((day, index) => 
              <TableHead key={index}>
                <div className="w-min flex-col">
                  <div>{format(day, 'E')}</div>
                  <div className="w-min mx-auto">{format(day, 'd')}</div>
                </div>
              </TableHead>  
            )
          }
          <TableHead className="flex w-min items-center gap-1 p-0">
            {isToday(startDate) ?
              <div className="h-8 w-8 p-0"></div>
              :
              <Button variant='ghost' className="h-8 w-8 p-0" onClick={increaseStartDate}>
                <ChevronLeft className="h-4 w-4"/>
              </Button>
            }
            <Button variant='ghost' className="h-8 w-8 p-0" onClick={decreaseStartDate}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          habits?.map(habit => 
            <HabitRow key={habit.id} id={habit.id} name={habit.name} dates_completed={habit.dates_completed} days={days} order={habit.order}/>
          )
        }
      </TableBody>
    </Table>
  )
}