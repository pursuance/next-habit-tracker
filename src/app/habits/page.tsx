import AddHabitButton from "@/components/habits/AddHabitButton";
import AddHabitModal from "@/components/habits/AddHabitModal";
import HabitTable from "@/components/habits/HabitTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export default async function Page() {

  const supabase = createServerComponentClient({ cookies })
  const {data: {session}} = await supabase.auth.getSession()

  if (!session) redirect('/')

  return (
    <>
      <div className="relative h-screen px-8">
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