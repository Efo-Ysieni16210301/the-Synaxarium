/**
 * Gregorian <-> Ethiopian calendar conversion.
 *
 * The Ethiopian year is offset from the Gregorian year by 7 (Jan-Aug)
 * or 8 (Sep-Dec) years, and Ethiopian New Year (1 Meskerem) falls on
 * 11 September in most years, or 12 September in the Gregorian year
 * immediately BEFORE a Gregorian leap year. This module implements
 * that widely-used practical rule.
 *
 * CAVEAT: this is accurate for the modern era (roughly 1900-2100) which
 * is all a saints'-feast-day app needs. It is NOT a rigorous
 * astronomical/historical calendar library. If you need certainty for
 * edge cases (far past/future dates, the exact moment of new year),
 * swap this module out for a maintained package such as `kenat` or
 * `ethiopian-date` from npm and keep the same function signatures so
 * nothing else in the app has to change.
 */

export interface EthiopianDate {
  year: number;
  month: number; // 1-13
  day: number; // 1-30 (1-5/6 in month 13, Pagumē)
}

const ETHIOPIAN_MONTH_NAMES_EN = [
  'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
  'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagumē',
];

const ETHIOPIAN_MONTH_NAMES_AM = [
  'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሣሥ', 'ጥር', 'የካቲት',
  'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን',
];

function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/** Gregorian calendar date (in that Gregorian year) of Ethiopian New Year. */
function ethiopianNewYearInGregorian(gregorianYear: number): Date {
  const followingYearIsLeap = isGregorianLeapYear(gregorianYear + 1);
  const day = followingYearIsLeap ? 12 : 11;
  return new Date(gregorianYear, 8, day); // month 8 = September (0-indexed)
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function gregorianToEthiopian(gregorianDate: Date): EthiopianDate {
  const g = startOfDay(gregorianDate);
  const gYear = g.getFullYear();

  const newYearSameGregYear = ethiopianNewYearInGregorian(gYear);
  let ethiopianYear: number;
  let newYearRef: Date;

  if (g.getTime() >= newYearSameGregYear.getTime()) {
    ethiopianYear = gYear - 7;
    newYearRef = newYearSameGregYear;
  } else {
    ethiopianYear = gYear - 8;
    newYearRef = ethiopianNewYearInGregorian(gYear - 1);
  }

  const diffDays = Math.round((g.getTime() - newYearRef.getTime()) / 86_400_000);
  const month = Math.floor(diffDays / 30) + 1;
  const day = (diffDays % 30) + 1;

  return { year: ethiopianYear, month, day };
}

export function ethiopianToGregorian(ethiopianDate: EthiopianDate): Date {
  // Ethiopian New Year of this Ethiopian year lands in Gregorian year (ethYear + 7)
  const gregYearOfNewYear = ethiopianDate.year + 7;
  const newYear = ethiopianNewYearInGregorian(gregYearOfNewYear);
  const dayOfYear = (ethiopianDate.month - 1) * 30 + (ethiopianDate.day - 1);
  const result = new Date(newYear);
  result.setDate(result.getDate() + dayOfYear);
  return result;
}

export function formatEthiopianDate(
  date: EthiopianDate,
  locale: 'en' | 'am'
): string {
  const names = locale === 'am' ? ETHIOPIAN_MONTH_NAMES_AM : ETHIOPIAN_MONTH_NAMES_EN;
  const monthName = names[date.month - 1] ?? String(date.month);
  return `${monthName} ${date.day}`;
}

/** "1-1" style key used to look up a FeastDay regardless of Ethiopian year. */
export function feastKeyFor(month: number, day: number): `${number}-${number}` {
  return `${month}-${day}`;
}

/** All 13 Ethiopian months as { number, en, am } - for building selectors. */
export function ethiopianMonths(): { number: number; en: string; am: string }[] {
  return ETHIOPIAN_MONTH_NAMES_EN.map((en, i) => ({
    number: i + 1,
    en,
    am: ETHIOPIAN_MONTH_NAMES_AM[i],
  }));
}

/**
 * Days in a given Ethiopian month. Months 1-12 always have 30 days.
 * Month 13 (Pagumē) has 5 days, or 6 in an Ethiopian leap year - since
 * a browsing UI doesn't know the Ethiopian year in advance, this
 * returns 6 so Pagumē 6 is always reachable (it will simply show "no
 * entry" in years it doesn't exist).
 */
export function daysInEthiopianMonth(month: number): number {
  return month === 13 ? 6 : 30;
}
