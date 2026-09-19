'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import { getFeastByKey } from '@/data/feasts';
import { feastKeyFor, ethiopianMonths } from '@/lib/ethiopianCalendar';
import FeastCard from '@/components/FeastCard';
import DateSelector from '@/components/DateSelector';
import LanguageToggle from '@/components/LanguageToggle';

export default function DayView({ month, day }: { month: number; day: number }) {
  const { locale, t } = useLocale();
  const feast = getFeastByKey(feastKeyFor(month, day));
  const monthName = ethiopianMonths().find((m) => m.number === month);
  const dateLabel = `${monthName ? (locale === 'am' ? monthName.am : monthName.en) : month} ${day}`;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-ember underline">
          &larr; {t('back')}
        </Link>
        <LanguageToggle />
      </header>

      <div className="mb-6">
        <DateSelector initialMonth={month} initialDay={day} />
      </div>

      {feast ? (
        <FeastCard feast={feast} dateLabel={dateLabel} />
      ) : (
        <div className="rounded-2xl border border-gold/40 bg-white/70 p-5 text-ink/70">
          <p className="font-semibold">{dateLabel}</p>
          <p className="mt-2 text-sm">{t('noEntry')}</p>
        </div>
      )}
    </main>
  );
}
