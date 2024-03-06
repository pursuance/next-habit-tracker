import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const getHabitsFromDB = async () => {
  const supabase = createClientComponentClient()
  const { data: habits } = await supabase.from('habits').select()
  return habits?.sort((a, b) => a.order - b.order)
}

export const updateDatesCompleted = async ( {id, dates_completed}: habit ) => {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase
    .from('habits')
    .update({ dates_completed })
    .eq('id', id)
}

export const addNewHabit = async (name: string, order: number) => {
  const supabase = createClientComponentClient()
  const user_id = (await supabase.auth.getUser()).data?.user?.id
  const { data, error } = await supabase
    .from('habits')
    .upsert({ name, dates_completed: [], order, user_id })
    .select()
}

export const deleteHabit = async (id: string) => {
  const supabase = createClientComponentClient()
  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id)
}

export const syncHabitOrder =  async (habits: habit[]) => {
  for (const habit of habits) {
    const supabase = createClientComponentClient()
    const { data, error } = await supabase
      .from('habits')
      .update({ order: habit.order })
      .eq('id', habit.id)
  }
}

export const renameHabitinDB = async (id: string, name: string) => {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase
    .from('habits')
    .update({ name })
    .eq('id', id)
}