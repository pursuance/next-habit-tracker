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
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { syncHabitOrder } from "@/lib/supabaseDB"
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers"

export default function HabitTable() {

  const [numOfDays, startDate, increaseStartDate, decreaseStartDate] = useDateStore((state) => [
    state.numOfDays, state.startDate, state.increaseStartDate, state.decreaseStartDate
  ])

  const days = new Array(numOfDays).fill(undefined).map((_, index) => 
    sub(startDate, { days: index })
  )

  const [habits, getHabitsState, setHabits] = useHabitStore((state) => [
    state.habits, state.getHabitsState, state.setHabits
  ])

 const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  })
 )

 const handleDragEnd = (event: any) => {
  const {active, over} = event
  if (habits) {
    const oldIndex = habits.findIndex(habit => habit.id === active.id)
    const newIndex = habits.findIndex(habit => habit.id === over.id)
    const newHabits = arrayMove(habits, oldIndex, newIndex).map((habit, index) => ({ ...habit, order: index }))
    setHabits(newHabits)
    syncHabitOrder(newHabits)
  }
 }

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
      {habits &&
        <TableBody>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}>
            <SortableContext items={habits} strategy={verticalListSortingStrategy}>
              {
                habits.map(habit => 
                  <HabitRow key={habit.id} habit={habit} days={days} />
                )
              }
            </SortableContext>
          </DndContext>
        </TableBody>
      }
    </Table>
  )
}