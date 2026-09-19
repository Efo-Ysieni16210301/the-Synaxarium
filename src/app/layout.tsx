import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import TabBar from "@/components/Tabbar";

export const metadata: Metadata = {
  title: "Feasts of the Saints / የቅዱሳን በዓላት",
  description:
    "Bilingual, offline-first calendar of Ethiopian/Eritrean Orthodox saints\u2019 feast days.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">
        <LocaleProvider>
          <ServiceWorkerRegister />
          <div className="pb-16">{children}</div>
          <TabBar />
        </LocaleProvider>
      </body>
    </html>
  );
}
