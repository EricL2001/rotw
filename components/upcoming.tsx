import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GeistMono } from 'geist/font/mono';
import { type SanityDocument } from "next-sanity";
import { client } from "../sanity/lib/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(showDate asc)[0...12]{_id, title, slug, showDate, venue, "imageUrl": image.asset->url, bandName}`;

const options = { next: { revalidate: 30 } };

export default async function Upcoming() {

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <section className="container space-y-10 py-24">
      <h2 className="font-bold text-3xl leading-[1.1] text-center">Upcoming Shows</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md">
        <div className="flex space-x-4 pb-4">
          {posts.map((show, index) => (
            <div
              key={index}
              className="w-[375px] shrink-0 bg-background p-6 rounded-lg border-[0.5px] border-white"
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
              <h3 className="text-l font-semibold text-white mt-2 mb-2">{show.title}</h3>
              <p className={`text-white text-sm ${GeistMono.className}`}>{show.venue}</p>
              <p className={`text-white mb-3 text-sm ${GeistMono.className}`}>{show.showDate}</p>
              <Link href={`/shows/${show.slug.current}`}>
                <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-gray-800 hover:text-white">
                  Info & Tickets
                </Button>
              </Link>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}