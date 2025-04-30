// // Querying with "sanityFetch" will keep content automatically updated
// // Before using it, import and render "<SanityLive />" in your layout, see
// // https://github.com/sanity-io/next-sanity#live-content-api for more information.
// import { defineLive } from "next-sanity";
// import { client } from './client'

// export const { sanityFetch } = defineLive({ 
//   client: client.withConfig({ 
//     // Live content is currently only available on the experimental API
//     // https://www.sanity.io/docs/api-versioning
//     apiVersion: '2025-03-14' 
//   }) 
// });

import { defineLive, createClient } from "next-sanity";
import { dataset, projectId, apiVersion } from '../env'

// Create a dedicated client for live preview
const liveClient = createClient({
  projectId,
  dataset,
  apiVersion, //'2025-03-14', // Use the experimental API version
  useCdn: false, // Always use fresh content for live preview
  perspective: 'previewDrafts', // See draft content
})

export const { sanityFetch } = defineLive({ client: liveClient });
