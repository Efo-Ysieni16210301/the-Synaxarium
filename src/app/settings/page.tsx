"use client";

import { useLocale } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

export default function SettingsPage() {
  const { t } = useLocale();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-ember">
        {t("settingsTitle")}
      </h1>

      <section className="mb-4 rounded-xl border border-gold/30 bg-white/60 p-4">
        <p className="mb-2 text-sm font-semibold text-ink/70">
          {t("language")}
        </p>
        <LanguageToggle />
      </section>

      <section className="rounded-xl border border-gold/30 bg-white/60 p-4">
        <p className="mb-2 text-sm font-semibold text-ink/70">
          {t("aboutApp")}
        </p>
        <p className="text-sm text-ink/80">{t("aboutAppText")}</p>
      </section>
    </main>
  );
}
