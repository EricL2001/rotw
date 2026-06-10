'use cache'

import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";
import { cacheLife } from 'next/cache';

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && showDate >= $today] | order(showDate asc)[0...25]
{
  show_id, 
  title, 
  slug, 
  showDate, 
  venue, 
  showType,
  supportName,
  "imageUrl": image.asset->url, 
  bandName
}`;

export async function getAllShows() {
  cacheLife('minutes');
  
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { today });

    return posts;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw new Error('Failed to fetch shows');
  }
}