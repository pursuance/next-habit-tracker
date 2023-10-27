import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export default function AddHabitButton() {
  return (
    <Button className="gap-2 absolute bottom-10 right-10">
      <PlusCircle />Add a Habit
    </Button>
  )
}