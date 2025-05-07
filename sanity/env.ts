export const apiVersion: string = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-14';

export const dataset: string = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export const projectId: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

console.log("Dataset from env:", dataset); 
console.log("ProjectID from env:", projectId); 

if (!dataset) {
    throw new Error('Missing the fucking environment variable: NEXT_PUBLIC_SANITY_DATASET');
}

if (!projectId) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID');
}