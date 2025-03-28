import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GeistMono } from 'geist/font/mono';
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { Badge } from "@/components/ui/badge"

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(showDate asc)[0...12]{_id, title, slug, showDate, venue, "imageUrl": image.asset->url, bandName}`;

const options = { next: { revalidate: 30 } };


export default async function ShowsPage() {

  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <div className="container mx-auto px-4 mb-6">
      <h1 className="text-3xl font-bold my-6">Upcoming Shows</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((show, index) => (
          <div
            key={index}
            className="shrink-0 bg-background p-6 rounded-lg border-[0.5px] border-white"
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
              <h3 className="text-l font-semibold text-white">{show.title}</h3>
              <Badge variant="green" className={GeistMono.className}>Free Show</Badge>
            </div>
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
    </div>
  )
}