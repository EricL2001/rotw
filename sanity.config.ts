'use client'
/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `\app\studio\[[...tool]]\page.tsx` route
 */

// import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// import {dataset, projectId, apiVersion} from './sanity/env'
import {projectId, dataset} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio',
  title: 'Ticketing',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    // visionTool({defaultApiVersion: apiVersion}),
  ],
  // Add CORS configuration
  cors: {
    allowedOrigins: [
      'http://localhost:3000',
      'https://rotw.sanity.studio',
      'https://rotw.vercel.app/',
      'https://recordsonthewall.co',
    ],
    credentials: true,
  }
})
