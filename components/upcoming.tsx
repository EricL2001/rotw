import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GeistMono } from 'geist/font/mono';
import { Badge } from "@/components/ui/badge"
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";
import { toZonedTime, format } from 'date-fns-tz';

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && showDate >= $today] | order(showDate asc)[0...12]{_id, title, slug, showDate, showType, venue, "imageUrl": image.asset->url, bandName}`;

const options = { next: { revalidate: 30 } };

export default async function Upcoming() {
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { today }, options);

  return (
    <section className="container space-y-10 py-16">
      <h2 className="font-bold text-3xl md:text-4xl leading-[1.1] text-center">Upcoming Shows</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 pb-4">
          {posts.map((show, index) => (
            <div
              key={index}
              className="w-[300px] sm:w-[375px] shrink-0 bg-background p-6 rounded-lg border-[0.5px] border-white"
            >
              {show.imageUrl ? (
                <Image
                  src={show.imageUrl}
                  alt={show.bandName || 'Show image'}
                  width={300}
                  height={200}
                  className="rounded object-cover w-full h-[200px]"
                />
              ) : (
                <div className="w-full h-[200px] bg-gray-800 rounded flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-2 mb-2">
                <h3 className="text-l font-semibold text-white mt-2">{show.title}</h3>
                {show.showType == 'Free' && (
                  <Badge variant="green" className={GeistMono.className}>Free Show</Badge>
                )}
              </div>
              <p className={`text-white text-sm ${GeistMono.className}`}>{show.venue}</p>
              <p className={`text-white mb-3 text-sm ${GeistMono.className}`}>
                {format(
                  toZonedTime(show.showDate, 'America/New_York'),
                  'EEE, MMMM d',
                  { timeZone: 'America/New_York' }
                )}
              </p>
              <Link href={`/shows/${show.slug.current}`}>
                {show.showType === 'Free' ? (
                  <Button variant="outline" className="border-orange-500 hover:bg-gray-800">
                    More Info
                  </Button>
                ) : (
                  <Button variant="outline" className="border-orange-500 hover:bg-gray-800">
                    Info & Tickets
                  </Button>
                )}
              </Link>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}