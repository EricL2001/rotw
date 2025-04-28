import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;


// double check this before production - change time to 15 and test
const options = { next: { revalidate: 30 } };


// fetch a specific show by slug
export async function getShow(slug: string) {
  const show = await client.fetch<SanityDocument>(POST_QUERY, { slug }, options);

  const postImageUrl = show.image
    ? urlFor(show.image)?.width(550).height(310).url()
    : null;

  return {
    show,
    postImageUrl
  };
}