'use client'

import { useDNDLockStore } from "@/store/HabitStore"
import { Button } from "./ui/button"
import { Lock, Unlock } from "lucide-react"

export default function DNDLockToggle() {

  const [ isLocked, flipLockState ] = useDNDLockStore((state) => [state.isLocked, state.flipLockState])

  const LockedOrUnlockedIcon = () => (isLocked ?
    <Lock className="h-[1.2rem] w-[1.2rem]" />
    :
    <Unlock className="h-[1.2rem] w-[1.2rem]" />
  )

  return (
    <Button variant='outline' size='icon' onClick={flipLockState}>
      <LockedOrUnlockedIcon />
    </Button>
  )
}