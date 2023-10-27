'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteHabit } from "@/lib/supabaseDB"
import { useHabitStore } from "@/store/HabitStore"
import { Button } from "./ui/button"
import { MoreVertical, Trash } from "lucide-react"

interface Props {
  id: string
}

export default function HabitOptions({ id }: Props) {

  const [habits, setHabits] = useHabitStore((state) => [
    state.habits, state.setHabits
  ])

  const handleDelete = (id: string) => {
    const updatedHabits = habits?.filter(habit => habit.id !== id)
    deleteHabit(id)
    updatedHabits && setHabits(updatedHabits)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleDelete(id)} className="cursor-pointer">
          <span className="text-red-700 flex items-center">
            <Trash className="red h-4 w-4 mr-1"/>
            <span className="text-gray-300 mr-1">|</span> Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}