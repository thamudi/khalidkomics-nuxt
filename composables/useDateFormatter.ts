export default function (date: string) {
  const newDate = new Date(date)
  const day = date.split('-')[2]
  const [month, year] = [
    newDate.toLocaleString('en-US', { month: 'short' }),
    newDate.getFullYear(),
  ]
  return `${month} ${day},${year}`
}
