interface habit {
  id: string;
  name: string;
  dates_completed: string[];
  order: number;
  user_id: string;
}

interface HabitsState  {
  habits: habit[] | null;
  getHabitsState: () => void
  setHabits: (habits: habit[]) => void;
}

interface DateState {
  numOfDays: number;
  setNumOfDays: (numOfDays:number) => void;
  startDate: Date;
  setStartDate: (startDate: Date) => void;
  increaseStartDate: () => void;
  decreaseStartDate: () => void;
}

interface DNDLockState {
  isLocked: boolean;
  flipLockState: () => void;
}
