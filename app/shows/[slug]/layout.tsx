import { Suspense } from "react";
import { getShow } from "@/lib/actions/getShow";
import { MetaPixel } from "@/components/meta-pixel";

const HUNT_HOUSE_VENUE = "The Hunt House";

async function HuntHouseMetaPixel({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { show } = await getShow(slug);
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  if (show?.venue !== HUNT_HOUSE_VENUE || !pixelId) return null;
  return <MetaPixel pixelId={pixelId} />;
}

export default function ShowLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <HuntHouseMetaPixel params={params} />
      </Suspense>
      {children}
    </>
  );
}
