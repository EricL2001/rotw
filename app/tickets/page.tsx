import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(showDate desc)[0...12]{_id, title, slug, showDate}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Ticketed Shows</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((show) => (
          <li className="hover:underline" key={show._id}>
            <Link href={`/tickets/${show.slug.current}`}>
              <h2 className="text-xl font-semibold">{show.title}</h2>
              <p>{new Date(show.showDate).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}