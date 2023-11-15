import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export default function AddHabitButton() {
  return (
    <Button className="gap-2">
      <PlusCircle />Add a Habit
    </Button>
  )
}