import { AboutUs } from '@/features/about-us';

export default async function PageAboutUs({
  params: paramsPromise,
}: PagePropsPromise<object>) {
  const { locale } = await paramsPromise;

  return <AboutUs locale={locale} />;
}
