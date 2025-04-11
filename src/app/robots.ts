
import type { MetadataRoute } from 'next';

// robots.txt
export default function robots(): MetadataRoute.Robots {
  const robots: MetadataRoute.Robots = {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: 'https://www.hhw31.com',
    sitemap: 'https://www.hhw31.com/sitemap.xml',
  }

  return robots;
}
