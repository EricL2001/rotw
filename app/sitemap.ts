import { MetadataRoute } from 'next'
import { getAllShows } from '@/lib/actions/getAllShows'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://recordsonthewall.co'
  
  // Get all shows for dynamic routes
  const shows = await getAllShows()
  
  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shows`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/store`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
  
  // Dynamic show routes
  const showRoutes: MetadataRoute.Sitemap = shows.map((show) => ({
    url: `${baseUrl}/shows/${show.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))
  
  return [...staticRoutes, ...showRoutes]
}