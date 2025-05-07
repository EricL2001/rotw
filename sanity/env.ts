export const apiVersion: string = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-14';

//export const dataset: string = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

//export const projectId: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";


export const dataset: string = process.env.SANITY_STUDIO_DATASET || 'ticket-prod';
export const projectId: string = process.env.SANITY_STUDIO_PROJECT_ID || '47h2dt9x';

//console.log("Dataset from env:", dataset); 
//console.log("ProjectID from env:", projectId); 

if (!dataset) {
    throw new Error(`Missing the environment variable: NEXT_PUBLIC_SANITY_DATASET. Dataset from env: ${dataset}`);
}

if (!projectId) {
    throw new Error(`Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID.  ProjectID from env: ${projectId}`);
}