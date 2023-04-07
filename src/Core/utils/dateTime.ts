/*
 * Date Time Utils
 */
import moment, { Moment, MomentInput, unitOfTime } from 'moment'
import humanizeDuration, { HumanizerOptions } from 'humanize-duration'
import { max, min } from 'lodash'
import 'moment/locale/ru'
import 'moment/locale/ja'
import 'moment/locale/ko'
import 'moment/locale/id'

export type DateTimeType = MomentInput

export const LOCALED_FORMATS_KEYS = {
  DAY_MONTH: 'DAY_MONTH',
  DATE_TIME: 'DATE_TIME',
  DATE_TIME_YEAR: 'DATE_TIME_YEAR',
  DATE_TIME_YEAR_SHORT: 'DATE_TIME_YEAR_SHORT',
  DATE_TIME_SHORT: 'DATE_TIME_SHORT',
  DATE: 'DATE',
  DATE_YEAR: 'DATE_YEAR',
  DATE_YEAR_SHORT: 'DATE_YEAR_SHORT',
  TIME: 'TIME',
}

// @see https://momentjs.com/docs/#/displaying/ (Localized formats)
const LOCALED_FORMATS: Record<string, string | Record<string, string>> = {
  // September 4
  [LOCALED_FORMATS_KEYS.DAY_MONTH]: {
    en: 'MMMM DD',
    other: 'DD MMMM',
  },
  // September 4, 8:30 PM
  [LOCALED_FORMATS_KEYS.DATE_TIME_SHORT]: {
    en: 'MMM DD, hh:mm A',
    other: 'DD MMM, HH:mm',
  },
  // September 4, 8:30 PM
  [LOCALED_FORMATS_KEYS.DATE_TIME]: {
    en: 'MMMM DD, hh:mm A',
    other: 'DD MMMM - HH:mm',
  },
  // September 4, 1986 8:30 PM
  [LOCALED_FORMATS_KEYS.DATE_TIME_YEAR]: 'LLL',
  // Sep 4, 1986 8:30 PM
  [LOCALED_FORMATS_KEYS.DATE_TIME_YEAR_SHORT]: 'lll',
  // September 4, 1986
  [LOCALED_FORMATS_KEYS.DATE_YEAR]: 'LL',
  // Sep 4, 1986
  [LOCALED_FORMATS_KEYS.DATE_YEAR_SHORT]: 'll',
  // 8:30 PM
  [LOCALED_FORMATS_KEYS.TIME]: 'LT',
}

export const getLocaledDateFormat = (key: string) => {
  const formats = LOCALED_FORMATS[key]
  if (!formats) {
    return ''
  }
  if (typeof formats === 'string') {
    return formats
  }
  return formats[moment.locale()] || formats.other
}

export const getMoment = (date?: DateTimeType) => {
  return moment.utc(date)
}

export const formatAPIDateTime = (date: DateTimeType, format: string): string => {
  const m = getMoment(date)
  return m.isValid() ? m.local().format(format) : '?'
}

export const getTimeStamp = (date: DateTimeType, inSeconds = false) => {
  return getMoment(date).local().valueOf() / (inSeconds ? 1 : 1000)
}

/**
 * UTC Date
 * @param {Moment} date
 */
export const formatToAPIDateTime = (date: Moment): string => {
  return date.format()
}

export const getDiffUntilDate = (
  eventDate: DateTimeType,
  unit: unitOfTime.Diff = 'days',
): number => {
  const event = getMoment(eventDate)
  if (!event) {
    return 0
  }
  const today = getMoment()
  return event.diff(today, unit)
}

export const getDateProgress = (
  startDate: DateTimeType,
  finishDate: DateTimeType,
): number => {
  const start = getMoment(startDate).valueOf()
  const finish = getMoment(finishDate).valueOf()
  if (!start || !finish) {
    return 0
  }
  if (start >= finish) {
    return 100
  }
  const today = getMoment().valueOf()
  const result = parseInt((((today - start) / (finish - start)) * 100).toString())

  if (!result) {
    return 0
  }

  return max([0, min([100, result])]) || 0
}

export const isDateBeforeNow = (date: DateTimeType) => {
  return getMoment().isAfter(getMoment(date))
}

export const getDuration = (startDate: DateTimeType, endDate: DateTimeType) => {
  const start = getMoment(startDate)
  const end = getMoment(endDate)

  if (!start || !end) {
    return null
  }

  return end.diff(start).valueOf()
}

export const getHumanizedDuration = (
  startDate: DateTimeType,
  endDate: DateTimeType,
  options?: HumanizerOptions,
) => {
  const duration = getDuration(startDate, endDate)

  if (duration === null) {
    return ''
  }

  return humanizeDuration(duration, {
    round: true,
    language: moment.locale(),
    ...options,
  })
}
