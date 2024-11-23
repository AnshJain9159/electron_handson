/* eslint-disable prettier/prettier */

import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

//yaha se date set hogi
const dateFormatter = new Intl.DateTimeFormat(window.context.locale, {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'UTC'
})

export const formatDateFromMs = (ms: number) => dateFormatter.format(ms)

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(...args))
}
