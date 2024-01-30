import { create } from 'zustand'
import { getHabitsFromDB } from '@/lib/supabaseDB'
import { add, sub } from 'date-fns'

export const useHabitStore = create<HabitsState>((set) => ({
  habits: [],
  getHabitsState: async () => {
    const habits = await getHabitsFromDB()
    set({ habits })
  },
  setHabits: (updatedHabits) => set({ habits: updatedHabits }),
  addFlag: false,
  flipAddFlag: () => set((state) => ({ addFlag: !state.addFlag }))
}))

export const useDateStore = create<DateState>((set) => ({
  numOfDays: 7,
  setNumOfDays: (numOfDays) => set({ numOfDays }),
  startDate: new Date(),
  setStartDate: (startDate) => set({ startDate }),
  increaseStartDate: () => set((state) => ({ startDate: add(state.startDate, { days: 1 })})),
  decreaseStartDate: () => set((state) => ({ startDate: sub(state.startDate, { days: 1 })}))
}))

export const useDNDLockStore = create<DNDLockState>((set) => ({
  isLocked: true,
  flipLockState: () => set((state) => ({ isLocked: !state.isLocked }))
}))