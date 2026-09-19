"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/lib/i18n";

const TABS = [
  { href: "/", emoji: "✝️", key: "tabToday", matches: ["/"] },
  {
    href: "/browse/",
    emoji: "📅",
    key: "tabCalendar",
    matches: ["/browse", "/month", "/day"],
  },
  {
    href: "/favorites/",
    emoji: "⭐",
    key: "tabFavorites",
    matches: ["/favorites"],
  },
  {
    href: "/settings/",
    emoji: "⚙️",
    key: "tabSettings",
    matches: ["/settings"],
  },
] as const;

export default function TabBar() {
  const pathname = usePathname();
  const { t } = useLocale();

  const isActive = (tab: (typeof TABS)[number]) => {
    if (tab.href === "/") return pathname === "/";
    return tab.matches.some(
      (prefix) => prefix !== "/" && pathname?.startsWith(prefix),
    );
  };

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-20 border-t border-gold/30 bg-parchment/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-2xl">
        {TABS.map((tab) => (
          <li key={tab.href} className="flex-1">
            <Link
              href={tab.href}
              className={`flex flex-col items-center gap-0.5 py-2 text-xs font-semibold ${
                isActive(tab) ? "text-ember" : "text-ink/50"
              }`}
            >
              <span className="text-lg leading-none" aria-hidden="true">
                {tab.emoji}
              </span>
              {t(tab.key)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
