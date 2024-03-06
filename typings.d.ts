interface habit {
  id: string;
  name: string;
  dates_completed: string[];
  order: number;
  user_id: string;
  editable?: boolean;
}

interface HabitsState  {
  habits: habit[] | null;
  getHabitsState: () => void
  setHabits: (habits: habit[]) => void;
  addFlag: boolean;
  flipAddFlag: () => void
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
