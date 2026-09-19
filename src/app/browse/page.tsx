'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n';
import { ethiopianMonths } from '@/lib/ethiopianCalendar';
import LanguageToggle from '@/components/LanguageToggle';

export default function BrowsePage() {
  const { locale, t } = useLocale();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold text-ember underline">
          &larr; {t('back')}
        </Link>
        <LanguageToggle />
      </header>

      <h1 className="mb-4 text-2xl font-bold text-ember">{t('browseByMonth')}</h1>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ethiopianMonths().map((m) => (
          <Link
            key={m.number}
            href={`/month/${m.number}/`}
            className="rounded-xl border border-gold/40 bg-white/70 px-4 py-3 text-center font-semibold text-ink hover:bg-white"
          >
            {locale === 'am' ? m.am : m.en}
          </Link>
        ))}
      </div>
    </main>
  );
}
