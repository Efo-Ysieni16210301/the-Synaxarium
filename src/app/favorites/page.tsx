"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { getAllFeasts } from "@/data/feasts";
import { SaintThumbnail } from "@/components/FeastCard";
import LanguageToggle from "@/components/LanguageToggle";

export default function FavoritesPage() {
  const { locale, t } = useLocale();
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("favorites");
    if (!stored) return;

    try {
      const parsed: unknown = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every((id) => typeof id === "string")) {
        setFavorites(parsed);
      }
    } catch {
      // Ignore malformed local storage data.
    }
  }, []);

  const allSaints = getAllFeasts().flatMap((feast) => feast.saints);
  const saved = allSaints.filter((saint) => favorites.includes(saint.id));

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ember">{t("favoritesTitle")}</h1>
        <LanguageToggle />
      </header>

      {saved.length === 0 && (
        <p className="rounded-2xl border border-gold/40 bg-white/70 p-5 text-sm text-ink/70">
          {t("noFavorites")}
        </p>
      )}

      <ul className="space-y-3">
        {saved.map((saint) => (
          <li
            key={saint.id}
            className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white/60 p-3"
          >
            <SaintThumbnail saint={saint} />
            <div>
              <p className="font-semibold text-ink">
                {saint.name[locale]}{" "}
                <span className="text-sm font-normal text-ink/60">
                  ({saint.title[locale]})
                </span>
              </p>
              <Link
                href={`/feast/${saint.id}/`}
                className="text-sm font-semibold text-ember underline"
              >
                {t("readMore")}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
