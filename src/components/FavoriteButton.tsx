"use client";

import { useFavorites } from "@/lib/favorites";
import { useLocale } from "@/lib/i18n";

export default function FavoriteButton({ saintId }: { saintId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useLocale();
  const active = isFavorite(saintId);

  return (
    <button
      onClick={() => toggleFavorite(saintId)}
      className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm font-semibold ${
        active
          ? "border-gold bg-gold/10 text-gold"
          : "border-ink/20 text-ink/60"
      }`}
      aria-pressed={active}
    >
      <span aria-hidden="true">{active ? "⭐" : "☆"}</span>
      {active ? t("removeFavorite") : t("addFavorite")}
    </button>
  );
}
