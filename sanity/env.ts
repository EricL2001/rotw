export const apiVersion: string = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-14';

// For Next.js client-side usage
export const nextPubDataset: string = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const nextPubProjectId: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// For Sanity Studio usage
export const dataset: string = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const projectId: string = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

// Optional: Log for debugging (only in development)
if (process.env.NODE_ENV === 'development') {
    console.log("Dataset from env:", dataset); 
    console.log("ProjectID from env:", projectId);
}

// Validation
if (!dataset) {
    throw new Error(`Missing Sanity dataset. Please set SANITY_STUDIO_DATASET or NEXT_PUBLIC_SANITY_DATASET environment variable.`);
}

if (!projectId) {
    throw new Error(`Missing Sanity project ID. Please set SANITY_STUDIO_PROJECT_ID or NEXT_PUBLIC_SANITY_PROJECT_ID environment variable.`);
}