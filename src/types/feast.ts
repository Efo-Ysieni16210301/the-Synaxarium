/**
 * Every piece of user-facing text is bilingual from the start.
 * Add more locale keys later (e.g. `ti` for Tigrinya, `om` for Afaan Oromo)
 * without touching any component code — just widen this type and add
 * the extra key to each data file.
 */
export interface Localized {
  en: string;
  am: string;
}

export interface Saint {
  id: string; // slug, e.g. "bartholomew-the-apostle"
  name: Localized;
  title: Localized; // e.g. "Apostle", "Archangel", "Righteous"
  summary: Localized; // 1-3 sentence synopsis for the feast card
  story: Localized; // fuller narrative for the detail page
  imageId?: string; // optional filename under /public/saints/
}

export interface FeastDay {
  /** Ethiopian calendar month, 1-13 (13 = Pagumē / Ṭəqemt intercalary days) */
  ethiopianMonth: number;
  /** Day of that Ethiopian month, 1-30 (or 1-5/6 for Pagumē) */
  ethiopianDay: number;
  /** Human label for the day, e.g. "Meskerem 1" */
  ethiopianDateLabel: Localized;
  /** Short label for the occasion itself, e.g. "New Year's Day" */
  occasion?: Localized;
  saints: Saint[];
}

/** A flat lookup key like "1-1" for month 1 day 1 (Meskerem 1). */
export type FeastKey = `${number}-${number}`;
