import AddHabitButton from "@/components/habits/AddHabitButton";
import HabitTable from "@/components/habits/HabitTable";
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className="relative h-screen">
        <HabitTable />
        <Link href='habits/AddHabit'>
          <AddHabitButton />
        </Link>
      </div>
    </>
  )
}