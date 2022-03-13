export const defaultDays = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  return days.map((day: any) => {
    return { day: day }
  })
}
