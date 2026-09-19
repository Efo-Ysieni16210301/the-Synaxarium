'use client';

import { useLocale } from '@/lib/i18n';

export default function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="flex items-center gap-2" aria-label={t('language')}>
      {(['en', 'am'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`rounded-full px-3 py-1 text-sm font-semibold transition ${
            locale === l
              ? 'bg-ember text-parchment'
              : 'bg-transparent text-ember hover:bg-ember/10'
          }`}
          aria-pressed={locale === l}
        >
          {l === 'en' ? 'English' : 'አማርኛ'}
        </button>
      ))}
    </div>
  );
}
