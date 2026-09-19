import { ethiopianMonths } from '@/lib/ethiopianCalendar';
import MonthView from '@/components/MonthView';

export function generateStaticParams() {
  return ethiopianMonths().map((m) => ({ month: String(m.number) }));
}

export default function MonthPage({ params }: { params: { month: string } }) {
  return <MonthView month={Number(params.month)} />;
}
