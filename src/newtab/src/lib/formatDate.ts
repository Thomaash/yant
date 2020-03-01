import dateFnsFormatDate from 'date-fns/format'

export function formatDate (date: Date | number, formatString: string): string {
  return dateFnsFormatDate(date, formatString, {
    useAdditionalDayOfYearTokens: true,
    useAdditionalWeekYearTokens: true
  })
}
