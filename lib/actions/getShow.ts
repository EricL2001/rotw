'use cache'

import { client } from "../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityDocument } from "next-sanity";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { cacheLife } from 'next/cache'

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// fetch a specific show by slug
export async function getShow(slug: string) {
  cacheLife('minutes')

  const show = await client.fetch<SanityDocument>(POST_QUERY, { slug });

  const postImageUrl = show.image
    ? urlFor(show.image)?.width(550).height(310).url()
    : null;

  const ogImageUrl = show.image
    ? urlFor(show.image)?.width(1200).height(630).url()
    : null;

  return {
    show,
    postImageUrl,
    ogImageUrl,
  };
}