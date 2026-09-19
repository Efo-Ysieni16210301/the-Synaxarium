'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import { getFeastByKey } from '@/data/feasts';
import {
  daysInEthiopianMonth,
  ethiopianMonths,
  feastKeyFor,
} from '@/lib/ethiopianCalendar';
import LanguageToggle from '@/components/LanguageToggle';

export default function MonthView({ month }: { month: number }) {
  const { locale, t } = useLocale();
  const monthInfo = ethiopianMonths().find((m) => m.number === month);
  const dayCount = daysInEthiopianMonth(month);
  const days = Array.from({ length: dayCount }, (_, i) => i + 1);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/browse/" className="text-sm font-semibold text-ember underline">
          &larr; {t('browse')}
        </Link>
        <LanguageToggle />
      </header>

      <h1 className="mb-4 text-2xl font-bold text-ember">
        {monthInfo ? (locale === 'am' ? monthInfo.am : monthInfo.en) : month}
      </h1>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
        {days.map((day) => {
          const hasEntry = Boolean(getFeastByKey(feastKeyFor(month, day)));
          return (
            <Link
              key={day}
              href={`/day/${month}/${day}/`}
              className={`rounded-lg border px-2 py-3 text-center text-sm font-semibold ${
                hasEntry
                  ? 'border-ember bg-ember/10 text-ember'
                  : 'border-gold/30 bg-white/50 text-ink/50'
              }`}
              title={hasEntry ? t('hasEntry') : t('noEntry')}
            >
              {day}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
