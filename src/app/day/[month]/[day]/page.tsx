import { daysInEthiopianMonth } from '@/lib/ethiopianCalendar';
import DayView from '@/components/DayView';

// Pre-render every possible Ethiopian month/day combination (12 x 30,
// plus 6 for Pagumē) so the static export has a real HTML file for
// every date - no server, no missing routes once installed offline.
export function generateStaticParams() {
  const params: { month: string; day: string }[] = [];
  for (let month = 1; month <= 13; month++) {
    const dayCount = daysInEthiopianMonth(month);
    for (let day = 1; day <= dayCount; day++) {
      params.push({ month: String(month), day: String(day) });
    }
  }
  return params;
}

export default function DayPage({
  params,
}: {
  params: { month: string; day: string };
}) {
  return <DayView month={Number(params.month)} day={Number(params.day)} />;
}
