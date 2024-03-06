import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export default function AddHabitButton() {
  return (
    <Button variant='ghost' className="gap-2 h-16 w-full border-b rounded-none justify-start">
      <PlusCircle />Add a Habit
    </Button>
  )
}