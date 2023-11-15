import AddHabitButton from "@/components/habits/AddHabitButton";
import AddHabitModal from "@/components/habits/AddHabitModal";
import HabitTable from "@/components/habits/HabitTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Page() {
  return (
    <>
      <div className="relative h-screen">
        <HabitTable />
        <Dialog>
          <DialogTrigger asChild>
            <AddHabitButton />
          </DialogTrigger>
          <DialogContent>
            <AddHabitModal />
          </DialogContent>
        </Dialog>
        
      </div>
    </>
  )
}