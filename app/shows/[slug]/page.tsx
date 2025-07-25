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
import type { Metadata } from "next";

const venueMaps = [
  {
    name: "Heist Brewery - NoDa",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/NhCDkcmRAihom6mt5"
  },
  {
    name: "The Rabbit Hole",
    city: "Charlotte, NC",
    mapsUrl: "https://maps.app.goo.gl/tfe67yXm6ZoiDgbJ6"
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

// This function generates metadata for the show page based on the slug parameter
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { show } = await getShow(resolvedParams.slug);

  return {
    title: show.showType === 'Free'
      ? `${show.title} at ${show.venue}`
      : `Tickets On Sale For ${show.title} • Records On The Wall`,
    description: `${show.showType === 'Free' ? 'Free show!' : `Grab tickets to see ${show.title} at ${show.venue}.`}`,
    openGraph: {
      title: show.showType === 'Free'
      ? `${show.title} at ${show.venue}`
      : `Tickets On Sale For ${show.title} • Records On The Wall`,
      description: `${show.showType === 'Free' ? 'Free show!' : `Grab tickets to see ${show.title} at ${show.venue}.`}`,
      url: `https://recordsonthewall.co/shows/${resolvedParams.slug}`,
      siteName: 'Records On The Wall',
      images: [
        {
          url: '/open-graph.png',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Tickets On Sale For ${show.title} • Records On The Wall`,
      description: `Grab tickets to see ${show.title} at ${show.venue}. ${show.showType === 'Free' ? 'Free show!' : `Tickets from $${show.price}`}`,
      images: ['/open-graph.png'],
    },
  };
}

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
      <Link href="/shows" className="hover:underline mb-3">
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
      <div className="flex justify-between items-start">
        <h1 className="text-2xl sm:text-3xl font-bold text-orange-500/90 flex-1 break-words">
          {show.title}
        </h1>
        {show.showType !== 'Ticketed' && (
          <Badge
            variant="green"
            className={`w-[100px] flex justify-center text-xs sm:text-sm ${GeistMono.className} ml-2 shrink-0`}
          >
            Free Show
          </Badge>
        )}
      </div>
      <p className="text-sm sm:text-base text-gray-400 mb-4">{show.supportName}</p>
      <h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
        {mapUrl && (
          <a href={mapUrl} target="_blank" rel="noopener noreferrer">
            <MapPin className="w-5 h-5 text-orange-500 hover:text-orange-400" />
          </a>
        )}
        {show.venue}
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
            show_id: show.show_id,
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

