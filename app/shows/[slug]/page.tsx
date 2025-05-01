import { PortableText } from "next-sanity"
import { PortableTextComponents } from "@portabletext/react";
import Image from "next/image"
import Link from "next/link"
import { getShow } from "@/lib/actions/getShow"
import { TicketSelector } from "@/components/ticket-selector"


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

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-1">
      <Link href="/shows" className="hover:underline mb-2">
        ← Back to all shows
      </Link>
      {postImageUrl && (
        <Image
          src={postImageUrl}
          alt={show.title}
          className="aspect-video rounded-xl mb-2"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold text-orange-500/90 mb-4">{show.title}</h1>
      <h2 className="text-2xl font-semibold">{show.venue}</h2>
      <p className="text-xl font-semibold">{new Date(show.showDate).toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })}</p>
      <p className="mb-4 text-xl font-semibold">Tix: ${show.price} / ${show.dosPrice} DOS</p>

      <TicketSelector show={{ title: show.title, price: show.price, venue: show.venue, showDate: show.showDate }} />

      <div>
        <hr className="my-8 border-t border-gray-300" />
        {/* add drawer with cart info for tickets to pass to Stripe checkout*/}
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

