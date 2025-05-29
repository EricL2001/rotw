import { PortableText } from "next-sanity"
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image"
import Link from "next/link"
import { GeistMono } from 'geist/font/mono'
import { Badge } from "@/components/ui/badge"
import { getShow } from "@/lib/actions/getShow"
import { TicketSelector } from "@/components/ticket-selector"
import { toZonedTime, format } from 'date-fns-tz';
import { MapPin } from "lucide-react";

const venueMaps = [
  {
    name: "Heist Brewery - NoDa",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/NhCDkcmRAihom6mt5"
  },
  {
    name: "Jacks Live",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/mj1xgUFZv8DRNM297"
  },
  {
    name: "Heist Barrel Arts",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/Sbser9fELVP5nW9V9"
  },
  {
    name: "Cactus Jacks",
    city: "Evergreen, CO",
    mapsUrl: "https://maps.app.goo.gl/ZxxtG3iLnmkhFKz57"
  },
]


const portableTextComponents: PortableTextComponents = {
  block: {
    // Customize paragraph rendering
    normal: ({ children }) => <p className="mb-2">{children}</p>,
  },
  list: {
    // Customize unordered list rendering
    bullet: ({ children }) => <ul className="list-disc ml-6 mb-2">{children}</ul>,
    // Customize ordered list rendering
    number: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
  },
  listItem: {
    // Customize list item rendering
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
};

// This is the page that shows the details of a single show
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { show, postImageUrl } = await getShow(resolvedParams.slug);

  const venueInfo = venueMaps.find((v) => v.name === show.venue);
  const mapUrl = venueInfo?.mapsUrl;
  

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-[2px]">
      <Link href="/shows" className="hover:underline mb-2">
        ← Back to all shows
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={show.title}
          className="aspect-video rounded-xl mb-2"
          width="750"
          height="310"
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-500/90">{show.title}</h1>
        {show.showType !== 'Ticketed' && (
          <Badge
            variant="green"
            className={`w-[100px] flex justify-center text-sm ${GeistMono.className}`}
          >
            Free Show
          </Badge>
        )}
      </div>
      <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
        {show.venue}
        {mapUrl && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="w-5 h-5 text-orange-500 ml-1 hover:text-orange-400" />
          </a>
        )}
      </h2>
      <p className={`text-sm text-white/80 mb-1 ${GeistMono.className}`}>{venueInfo?.city}</p>
      <p className="text-xl sm:text-2xl font-semibold">
        {format(
          toZonedTime(show.showDate, 'America/New_York'),
          'EEE, MMM d',
          { timeZone: 'America/New_York' }
        )}
      </p>
      {show.showType !== 'Free' && (
        <p className="mb-4 text-xl sm:text-2xl font-semibold">Tix: ${show.price} / ${show.dosPrice} DOS</p>
      )}

      {show.showType !== 'Free' && (
        <TicketSelector
          show={{
            title: show.title,
            price: show.price,
            promoPrice: show.promoPrice,
            dosPrice: show.dosPrice,
            venue: show.venue,
            showDate: show.showDate,
            showType: show.showType,
          }}
        />
      )}

      <div>
        <hr className="my-8 border-gray-600" />
        {/* add some sharing buttons, indicators, calendar add */}
      </div>
      <div className="text-white">
        {Array.isArray(show.description) && (
          <PortableText value={show.description} components={portableTextComponents} />
        )}
      </div>
    </main>
  );
}

