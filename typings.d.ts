interface habit {
  id: string;
  name: string;
  dates_completed: string[];
  order: number;
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
  increaseStartDate: () => void;
  decreaseStartDate: () => void;
}