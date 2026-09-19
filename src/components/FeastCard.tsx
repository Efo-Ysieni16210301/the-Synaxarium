"use client";

import Link from "next/link";
import { useLocale } from "@/lib/i18n";
import type { FeastDay } from "@/types/feast";

export default function FeastCard({
  feast,
  dateLabel,
}: {
  feast: FeastDay;
  dateLabel: string;
}) {
  const { locale, t } = useLocale();

  return (
    <div className="rounded-2xl border border-gold/40 bg-white/70 p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-gold">
        {dateLabel}
      </p>
      {feast.occasion && (
        <h2 className="mt-1 text-xl font-bold text-ember">
          {feast.occasion[locale]}
        </h2>
      )}

      <ul className="mt-4 space-y-4">
        {feast.saints.map((saint) => (
          <li
            key={saint.id}
            className="flex gap-3 border-t border-gold/20 pt-3 first:border-0 first:pt-0"
          >
            <SaintThumbnail saint={saint} />
            <div>
              <p className="font-semibold text-ink">
                {saint.name[locale]}{" "}
                <span className="text-sm font-normal text-ink/60">
                  ({saint.title[locale]})
                </span>
              </p>
              <p className="mt-1 text-sm text-ink/80">
                {saint.summary[locale]}
              </p>
              <Link
                href={`/feast/${saint.id}/`}
                className="mt-1 inline-block text-sm font-semibold text-ember underline"
              >
                {t("readMore")}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Shows the saint's photo/icon if one was supplied (`saint.imageId`,
 * a filename under /public/saints/). Falls back to a plain initial
 * badge so the layout doesn't break for saints without an image yet -
 * most days will be missing one at first, since real content has to
 * be added file-by-file.
 */
export function SaintThumbnail({
  saint,
}: {
  saint: FeastDay["saints"][number];
}) {
  const { locale } = useLocale();

  if (saint.imageId) {
    return (
      // Plain <img>, not next/image: this is a static export with no
      // image-optimization server, and the browser's normal <img>
      // caching is exactly what the service worker piggybacks on for
      // offline use anyway.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/saints/${saint.imageId}`}
        alt={saint.name[locale]}
        className="h-14 w-14 flex-shrink-0 rounded-full border border-gold/40 object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div
      className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-lg font-bold text-gold"
      aria-hidden="true"
    >
      {saint.name[locale].charAt(0)}
    </div>
  );
}
