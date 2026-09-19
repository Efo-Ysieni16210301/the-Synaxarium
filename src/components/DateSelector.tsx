'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useLocale } from '@/lib/i18n';
import { ethiopianMonths, daysInEthiopianMonth } from '@/lib/ethiopianCalendar';

export default function DateSelector({
  initialMonth = 1,
  initialDay = 1,
}: {
  initialMonth?: number;
  initialDay?: number;
}) {
  const { locale, t } = useLocale();
  const router = useRouter();
  const [month, setMonth] = useState(initialMonth);
  const [day, setDay] = useState(initialDay);

  const months = ethiopianMonths();
  const dayCount = daysInEthiopianMonth(month);

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    const maxDay = daysInEthiopianMonth(newMonth);
    if (day > maxDay) setDay(maxDay);
  };

  const go = () => {
    router.push(`/day/${month}/${Math.min(day, dayCount)}/`);
  };

  return (
    <div className="flex flex-wrap items-end gap-3 rounded-xl border border-gold/30 bg-white/60 p-4">
      <label className="flex flex-col text-sm">
        <span className="mb-1 font-semibold text-ink/70">{t('selectMonth')}</span>
        <select
          className="rounded-lg border border-gold/40 bg-white px-2 py-1"
          value={month}
          onChange={(e) => handleMonthChange(Number(e.target.value))}
        >
          {months.map((m) => (
            <option key={m.number} value={m.number}>
              {locale === 'am' ? m.am : m.en}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col text-sm">
        <span className="mb-1 font-semibold text-ink/70">{t('selectDay')}</span>
        <select
          className="rounded-lg border border-gold/40 bg-white px-2 py-1"
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
        >
          {Array.from({ length: dayCount }, (_, i) => i + 1).map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      <button
        onClick={go}
        className="rounded-lg bg-ember px-4 py-1.5 text-sm font-semibold text-parchment"
      >
        {t('goToDate')}
      </button>
    </div>
  );
}
