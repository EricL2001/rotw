import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };


export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const show = await client.fetch<SanityDocument>(POST_QUERY, await params, options);
  const postImageUrl = show.image
    ? urlFor(show.image)?.width(550).height(310).url()
    : null;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-1 ">
      <Link href="/shows" className="hover:underline">
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
        month: 'long',
        day: 'numeric',
      })}</p>
      <p>GA - ${show.price}</p>
      <p className="mb-4">DOS - ${show.dosPrice}</p>
      <div className="prose">
        {Array.isArray(show.description) && <PortableText value={show.description} />}
      </div>
      <div>
        <hr className="my-8 border-t border-gray-300" />
        {/* add some sharing buttons and indicators */}
      </div>
    </main>
  );
}