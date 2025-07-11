import Image from "next/image"
import { GeistMono } from 'geist/font/mono'
import { Badge } from "@/components/ui/badge"
import { getAllShows } from "@/lib/actions/getAllShows"
import { toZonedTime, format } from 'date-fns-tz';
import { ShowButton } from "@/components/show-button"

export default async function ShowsPage() {
  const posts = await getAllShows();

  return (
    <div className="container mx-auto px-8 mb-6">
      <h1 className="font-semibold text-xl sm:text-2xl md:text-3xl mt-8 mb-2 text-center">Upcoming Shows</h1>
      <p className="mb-8 text-muted-foreground sm:text-lg text-center">
        All of our free and ticketed shows
      </p>
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
                width={300} //350 maybe
                height={200}
                className="rounded object-cover w-full h-[200px]"
              />
            ) : (
              <div className="w-full h-[200px] bg-gray-800 rounded flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            <div className="flex items-center justify-between mt-2">
              <h3 className="text-l font-semibold text-white mt-2">{show.title}</h3>
              {show.showType == 'Free' && (
                <Badge variant="green" className={GeistMono.className}>Free Show</Badge>
              )}
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-2">{show.supportName}</p>
            <p className={`text-white text-sm ${GeistMono.className}`}>{show.venue}</p>
            <p className={`text-white mb-3 text-sm ${GeistMono.className}`}>
              {format(
                toZonedTime(show.showDate, 'America/New_York'),
                'EEE, MMMM d',
                { timeZone: 'America/New_York' }
              )}
            </p>
            <ShowButton 
              slug={show.slug.current}
              showType={show.showType}
            />
          </div>
        ))}
      </div>
    </div>
  )
}