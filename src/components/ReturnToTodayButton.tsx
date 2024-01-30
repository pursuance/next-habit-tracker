'use client'

import { useDateStore } from "@/store/HabitStore"
import { Button } from "./ui/button"
import { ChevronFirst } from "lucide-react"
import { sub, compareAsc } from "date-fns"

export default function ReturnToTodayButton() {
  const [startDate, numOfDays, setStartDate] = useDateStore((state) => [
    state.startDate, state.numOfDays, state.setStartDate
  ])

  const today = new Date()

  const appearanceDate = sub(today, { days: numOfDays + 1 })

  const returnToToday = () => {
    setStartDate(new Date())
  }

  return (
    <>
      {(compareAsc(startDate, appearanceDate) === -1) ?
        <Button asChild variant='ghost' className="h-8 w-8 p-0" onClick={returnToToday}>
          <ChevronFirst className="h-4 w-4" />
        </Button>
        :
        <div className="h-8 w-8 p-0"></div>
      }
    </>
  )
}