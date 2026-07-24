import { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'

// Normalize any RU input (8…, 9…, +7…) to +7 and live-format via libphonenumber.
export function formatRuPhone(raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d[0] === '8') d = '7' + d.slice(1)
  if (d && d[0] !== '7') d = '7' + d
  d = d.slice(0, 11)
  return d ? new AsYouType('RU').input('+' + d) : ''
}

export function isValidRuPhone(value: string): boolean {
  return isValidPhoneNumber(value, 'RU')
}
