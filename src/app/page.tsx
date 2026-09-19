"use client";

import { useEffect, useState } from "react";
import {
  gregorianToEthiopian,
  formatEthiopianDate,
  feastKeyFor,
} from "@/lib/ethiopianCalendar";
import { getFeastByKey } from "@/data/feasts";
import { useLocale } from "@/lib/i18n";
import Link from "next/link";
import FeastCard from "@/components/FeastCard";
import DateSelector from "@/components/DateSelector";
import LanguageToggle from "@/components/LanguageToggle";

export default function HomePage() {
  const { locale, t } = useLocale();

  // Computed on the client: this page is statically exported, so "today"
  // must be resolved in the browser, not baked in at build time.
  const [ethiopianToday, setEthiopianToday] = useState<ReturnType<
    typeof gregorianToEthiopian
  > | null>(null);

  useEffect(() => {
    setEthiopianToday(gregorianToEthiopian(new Date()));
  }, []);

  const feast = ethiopianToday
    ? getFeastByKey(feastKeyFor(ethiopianToday.month, ethiopianToday.day))
    : undefined;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ember">{t("appName")}</h1>
        <LanguageToggle />
      </header>

      <p className="mb-2 text-sm font-semibold text-ink/60">
        {t("todaysFeast")}
      </p>

      {!ethiopianToday && <p className="text-ink/60">…</p>}

      {ethiopianToday && feast && (
        <FeastCard
          feast={feast}
          dateLabel={formatEthiopianDate(ethiopianToday, locale)}
        />
      )}

      {ethiopianToday && !feast && (
        <div className="rounded-2xl border border-gold/40 bg-white/70 p-5 text-ink/70">
          <p className="font-semibold">
            {formatEthiopianDate(ethiopianToday, locale)}
          </p>
          <p className="mt-2 text-sm">{t("noEntry")}</p>
        </div>
      )}

      <section className="mt-10">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold text-ink/60">
            {t("browseByMonth")}
          </p>
          <Link
            href="/browse/"
            className="text-sm font-semibold text-ember underline"
          >
            {t("browse")}
          </Link>
        </div>
        <DateSelector
          initialMonth={ethiopianToday?.month ?? 1}
          initialDay={ethiopianToday?.day ?? 1}
        />
      </section>
    </main>
  );
}
