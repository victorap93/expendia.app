export const getPercentage = (
  value: number,
  total: number,
  fractionDigits = 2
) => {
  const percentage = (value / total) * 100
  if (percentage % 1 === 0) return percentage.toString()
  else return percentage.toFixed(fractionDigits)
}
