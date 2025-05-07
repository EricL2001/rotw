import { type SanityDocument } from "next-sanity";
import { client } from "../../sanity/lib/client";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current) && showDate >= $today] | order(showDate asc)[0...12]
{
  _id, 
  title, 
  slug, 
  showDate, 
  venue, 
  showType,
  "imageUrl": image.asset->url, 
  bandName
}`;

const options = { next: { revalidate: 30 } };

export async function getAllShows() {

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  try {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, { today }, options);

    // Debugging: Log the fetched posts and today's date
    // posts.forEach((post) => {
    //   console.log("Show title:", post.title);
    //   console.log("Show date:", post.showDate);
    //   console.log("Today's date:", today);
    // });

    return posts;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw new Error('Failed to fetch shows');
  }
}