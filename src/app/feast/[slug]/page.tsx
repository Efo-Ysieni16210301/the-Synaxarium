import { getAllFeasts } from '@/data/feasts';
import SaintDetail from '@/components/SaintDetail';

// Required for `output: 'export'` - Next.js needs to know every dynamic
// route it must pre-render into a static HTML file at build time.
export function generateStaticParams() {
  const slugs = getAllFeasts().flatMap((feast) =>
    feast.saints.map((saint) => ({ slug: saint.id }))
  );
  return slugs;
}

export default function FeastDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const feast = getAllFeasts().find((f) =>
    f.saints.some((s) => s.id === params.slug)
  );
  const saint = feast?.saints.find((s) => s.id === params.slug);

  return <SaintDetail feast={feast} saint={saint} />;
}
