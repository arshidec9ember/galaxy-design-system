import {
  isValid,
  isSameDay,
  getDate,
  getMonth,
  getYear,
  isSameMonth,
  isSameYear,
  getTime,
  startOfMonth,
  addDays,
  addMonths,
  addYears,
  addQuarters,
  getDay,
  parse,
  format,
  startOfYear,
  getQuarter,
  isSameQuarter,
  startOfDay,
  endOfDay,
  endOfMonth,
  endOfYear,
  startOfQuarter,
  endOfQuarter
} from 'date-fns/esm'
import type { ZDateLocale } from '../../locales'
import { type DatePickerType, START_YEAR } from './config'
import type { Shortcuts, Value } from './interface'

function getDerivedTimeFromKeyboardEvent (
  prevValue: number | null,
  event: KeyboardEvent
): number {
  const now = getTime(Date.now())
  if (typeof prevValue !== 'number') return now
  switch (event.key) {
    case 'ArrowUp':
      return getTime(addDays(prevValue, -7))
    case 'ArrowDown':
      return getTime(addDays(prevValue, 7))
    case 'ArrowRight':
      return getTime(addDays(prevValue, 1))
    case 'ArrowLeft':
      return getTime(addDays(prevValue, -1))
  }
  return now
}

const matcherMap = {
  date: isSameDay,
  month: isSameMonth,
  year: isSameYear,
  quarter: isSameQuarter
} as const

function matchDate (
  sourceTime: number,
  patternTime: number | Date,
  type: 'date' | 'month' | 'year' | 'quarter'
): boolean {
  const matcher = matcherMap[type]
  if (Array.isArray(sourceTime)) {
    return sourceTime.some((time) => matcher(time, patternTime))
  } else {
    return matcher(sourceTime, patternTime)
  }
}
export const monthMap: Record<number, string> = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}
export interface DateItem {
  type: 'date'
  dateObject: {
    date: number
    month: number
    year: number
  }
  inCurrentMonth: boolean
  isCurrentDate: boolean
  inSpan: boolean
  startOfSpan: boolean
  endOfSpan: boolean
  selected: boolean
  ts: number
}

export interface MonthItem {
  type: 'month'
  dateObject: {
    month: number
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}

export interface YearItem {
  type: 'year'
  dateObject: {
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}

export interface QuarterItem {
  type: 'quarter'
  dateObject: {
    quarter: number
    year: number
  }
  isCurrent: boolean
  selected: boolean
  ts: number
}

// date item's valueTs can be a tuple since two date may show in one panel, so
// any matched value would make it shown as selected
function dateItem (
  time: number,
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number
): DateItem {
  let inSpan = false
  let startOfSpan = false
  let endOfSpan = false
  if (Array.isArray(valueTs)) {
    if (valueTs[0] < time && time < valueTs[1]) {
      inSpan = true
    }
    if (matchDate(valueTs[0], time, 'date')) startOfSpan = true
    if (matchDate(valueTs[1], time, 'date')) endOfSpan = true
  }
  const selected =
    valueTs !== null &&
    (Array.isArray(valueTs)
      ? matchDate(valueTs[0], time, 'date') ||
        matchDate(valueTs[1], time, 'date')
      : matchDate(valueTs, time, 'date'))
  return {
    type: 'date',
    dateObject: {
      date: getDate(time),
      month: getMonth(time),
      year: getYear(time)
    },
    inCurrentMonth: isSameMonth(time, monthTs),
    isCurrentDate: matchDate(currentTs, time, 'date'),
    inSpan,
    startOfSpan,
    endOfSpan,
    selected,
    ts: getTime(time)
  }
}

function monthItem (
  monthTs: number,
  valueTs: number | null,
  currentTs: number
): MonthItem {
  return {
    type: 'month',
    dateObject: {
      month: getMonth(monthTs),
      year: getYear(monthTs)
    },
    isCurrent: isSameMonth(currentTs, monthTs),
    selected: valueTs !== null && matchDate(valueTs, monthTs, 'month'),
    ts: getTime(monthTs)
  }
}

function yearItem (
  yearTs: number,
  valueTs: number | null,
  currentTs: number
): YearItem {
  return {
    type: 'year',
    dateObject: {
      year: getYear(yearTs)
    },
    isCurrent: isSameYear(currentTs, yearTs),
    selected: valueTs !== null && matchDate(valueTs, yearTs, 'year'),
    ts: getTime(yearTs)
  }
}

function quarterItem (
  quarterTs: number,
  valueTs: number | null,
  currentTs: number
): QuarterItem {
  return {
    type: 'quarter',
    dateObject: {
      quarter: getQuarter(quarterTs),
      year: getYear(quarterTs)
    },
    isCurrent: isSameQuarter(currentTs, quarterTs),
    selected: valueTs !== null && matchDate(valueTs, quarterTs, 'quarter'),
    ts: getTime(quarterTs)
  }
}

/**
 * Given time to display calendar, given the selected time, given current time,
 * return the date array of display time's month.
 */
function dateArray (
  monthTs: number,
  valueTs: number | [number, number] | null,
  currentTs: number,
  startDay: 0 | 1 | 2 | 3 | 4 | 5 | 6,
  strip: boolean = false
): DateItem[] {
  const displayMonth = getMonth(monthTs)
  // First day of current month
  let displayMonthIterator = getTime(startOfMonth(monthTs))
  // Last day of last month
  let lastMonthIterator = getTime(addDays(displayMonthIterator, -1))
  const calendarDays: DateItem[] = []
  let protectLastMonthDateIsShownFlag = !strip
  while (
    getDay(lastMonthIterator) !== startDay ||
    protectLastMonthDateIsShownFlag
  ) {
    calendarDays.unshift(
      dateItem(lastMonthIterator, monthTs, valueTs, currentTs)
    )
    lastMonthIterator = getTime(addDays(lastMonthIterator, -1))
    protectLastMonthDateIsShownFlag = false
  }
  while (getMonth(displayMonthIterator) === displayMonth) {
    calendarDays.push(
      dateItem(displayMonthIterator, monthTs, valueTs, currentTs)
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  const endIndex = strip
    ? calendarDays.length <= 28
      ? 28
      : calendarDays.length <= 35
        ? 35
        : 42
    : 42
  while (calendarDays.length < endIndex) {
    calendarDays.push(
      dateItem(displayMonthIterator, monthTs, valueTs, currentTs)
    )
    displayMonthIterator = getTime(addDays(displayMonthIterator, 1))
  }
  return calendarDays
}

function monthArray (
  yearAnchorTs: number,
  valueTs: number | null,
  currentTs: number
): MonthItem[] {
  const calendarMonths: MonthItem[] = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 12; i++) {
    calendarMonths.push(
      monthItem(getTime(addMonths(yearStart, i)), valueTs, currentTs)
    )
  }
  return calendarMonths
}

function quarterArray (
  yearAnchorTs: number,
  valueTs: number | null,
  currentTs: number
): QuarterItem[] {
  const calendarQuarters: QuarterItem[] = []
  const yearStart = startOfYear(yearAnchorTs)
  for (let i = 0; i < 4; i++) {
    calendarQuarters.push(
      quarterItem(getTime(addQuarters(yearStart, i)), valueTs, currentTs)
    )
  }
  return calendarQuarters
}

function yearArray (valueTs: number | null, currentTs: number): YearItem[] {
  const calendarYears: YearItem[] = []
  const time1900 = new Date(START_YEAR, 0, 1)
  // 1900 is not a round time, so we use 1911 as start...
  // new Date(1900, 0, 1)
  // 1899-12-31T15:54:17.000Z
  for (let i = 0; i < 200; i++) {
    calendarYears.push(
      yearItem(getTime(addYears(time1900, i)), valueTs, currentTs)
    )
  }
  return calendarYears
}

function strictParse (
  string: string,
  pattern: string,
  backup: Date,
  option: {
    locale: ZDateLocale['locale']
  }
): Date {
  const result = parse(string, pattern, backup, option)
  if (!isValid(result)) return result
  else if (format(result, pattern, option) === string) return result
  else return new Date(NaN)
}

function getDefaultTime (timeValue: string | undefined):
| {
  hours: number
  minutes: number
  seconds: number
}
| undefined {
  if (timeValue === undefined) {
    return undefined
  }
  if (typeof timeValue === 'number') {
    return timeValue
  }
  const [hour, minute, second] = timeValue.split(':')
  return {
    hours: Number(hour),
    minutes: Number(minute),
    seconds: Number(second)
  }
}

function pluckValueFromRange (
  value: Value | null,
  type: 'start' | 'end'
): number | null {
  return Array.isArray(value) ? value[type === 'start' ? 0 : 1] : null
}

function getShortcuts (type: DatePickerType): Shortcuts {
  const now = new Date()
  const todayStart = startOfDay(now)
  const todayEnd = endOfDay(now)

  switch (type) {
    case 'date':
    case 'datetime':
      return {
        Today: getTime(todayStart),
        Yesterday: getTime(addDays(todayStart, -1)),
        Tomorrow: getTime(addDays(todayStart, 1))
      }
    case 'daterange':
    case 'datetimerange': {
      return {
        Today: [getTime(todayStart), getTime(todayEnd)],
        Yesterday: [
          getTime(addDays(todayStart, -1)),
          getTime(addDays(todayEnd, -1))
        ],
        'Last 7 Days': [getTime(addDays(todayStart, -7)), getTime(todayEnd)],
        'Last 30 Days': [getTime(addDays(todayStart, -30)), getTime(todayEnd)],
        'Month to Date': [getTime(startOfMonth(todayStart)), getTime(todayEnd)],
        'This Month': [
          getTime(startOfMonth(todayStart)),
          getTime(endOfMonth(todayEnd))
        ],
        'Last Month': [
          getTime(startOfMonth(addMonths(todayStart, -1))),
          getTime(endOfMonth(addMonths(todayEnd, -1)))
        ],
        'Year to Date': [getTime(startOfYear(todayStart)), getTime(todayEnd)],
        'This Year': [
          getTime(startOfYear(todayStart)),
          getTime(endOfYear(todayEnd))
        ]
      }
    }
    case 'month':
      return {
        'This Month': getTime(startOfMonth(todayStart))
      }
    case 'monthrange': {
      return {
        'Month To Date': [
          getTime(startOfMonth(todayStart)),
          getTime(endOfDay(todayEnd))
        ],
        'Last Month': [
          getTime(startOfMonth(addMonths(todayStart, -1))),
          getTime(endOfMonth(addMonths(todayEnd, -1)))
        ],
        'Year to Date': [
          getTime(startOfYear(todayStart)),
          getTime(endOfDay(todayEnd))
        ],
        'This Year': [
          getTime(startOfYear(todayStart)),
          getTime(endOfYear(todayEnd))
        ]
      }
    }
    case 'quarter': {
      return {
        'This Quarter': getTime(startOfQuarter(todayStart)),
        'Last Quarter': getTime(startOfQuarter(addQuarters(todayStart, -1)))
      }
    }
    case 'quarterrange':
      return {
        'Quarter To Date': [
          getTime(startOfQuarter(todayStart)),
          getTime(endOfDay(todayEnd))
        ],
        'Last Quarter': [
          getTime(startOfQuarter(addQuarters(todayStart, -1))),
          getTime(endOfQuarter(addQuarters(todayEnd, -1)))
        ],
        'Year to Date': [
          getTime(startOfYear(todayStart)),
          getTime(endOfDay(todayEnd))
        ],
        'This Year': [
          getTime(startOfYear(todayStart)),
          getTime(endOfYear(todayEnd))
        ]
      }
    case 'year': {
      return {
        'This Year': getTime(startOfYear(todayStart)),
        'Last Year': getTime(startOfYear(addYears(todayStart, -1)))
      }
    }
    case 'yearrange':
      return {
        'Year To Date': [
          getTime(startOfYear(todayStart)),
          getTime(endOfDay(todayEnd))
        ],
        'Last Year': [
          getTime(startOfYear(addYears(todayStart, -1))),
          getTime(endOfYear(addYears(todayEnd, -1)))
        ]
      }
    default:
      return {}
  }
}

export {
  dateArray,
  monthArray,
  yearArray,
  quarterArray,
  strictParse,
  getDerivedTimeFromKeyboardEvent,
  getDefaultTime,
  pluckValueFromRange,
  getShortcuts
}
