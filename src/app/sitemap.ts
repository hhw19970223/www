import { MetadataRoute } from 'next';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { i18nConfig } from '@/components/i18n';
import { PATHNAME_ROOT } from '@/const/path';

export interface SiteMapParams {
  lastModified: string | Date | undefined;
  changeFrequency: 'weekly' | 'monthly';
  origin: string;
  priority: number;
}

dayjs.extend(utc);

const origin = process.env.NEXT_PUBLIC_API_URL;

const changeFrequency = 'weekly' as const;

const pagePathnameArray: string[] = [];

const lastModified = dayjs().utc().format();

export default async function sitemap() {
  const sitemap: MetadataRoute.Sitemap = [];

  sitemap.push({
    url: origin + '/',
    lastModified,
    changeFrequency,
    priority: 1,
  });

  for (const locale of i18nConfig.locales) {
    pagePathnameArray.forEach((pathname) => {
      sitemap.push({
        url: removeTrailingSlashes(`${origin}/${locale}${pathname}`),
        lastModified,
        changeFrequency,
        priority: 0.8,
      });
    });
  }

  return sitemap;
}

function removeTrailingSlashes(str: string) {
  return str.replace(/\/+$/, '') || PATHNAME_ROOT;
}