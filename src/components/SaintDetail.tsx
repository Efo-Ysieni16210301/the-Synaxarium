"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import type { FeastDay, Saint } from "@/types/feast";
import FavoriteButton from "@/components/Favoritebutton";

export default function SaintDetail({
  feast,
  saint,
}: {
  feast?: FeastDay;
  saint?: Saint;
}) {
  const { locale, t } = useLocale();

  if (!feast || !saint) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p>{t("noEntry")}</p>
        <Link href="/" className="text-ember underline">
          {t("back")}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/" className="text-sm font-semibold text-ember underline">
        &larr; {t("back")}
      </Link>

      {saint.imageId && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/saints/${saint.imageId}`}
          alt={saint.name[locale]}
          className="mt-4 w-full max-w-sm rounded-xl border border-gold/40 object-cover"
          loading="lazy"
        />
      )}

      <h1 className="mt-4 text-2xl font-bold text-ember">
        {saint.name[locale]}
      </h1>
      <p className="text-ink/60">{saint.title[locale]}</p>
      <FavoriteButton saintId={saint.id} />

      <article className="prose prose-neutral mt-6 whitespace-pre-line leading-relaxed">
        {saint.story[locale]}
      </article>
    </main>
  );
}
