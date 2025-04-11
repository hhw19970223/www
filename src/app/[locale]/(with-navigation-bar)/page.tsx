import { Home } from "@/features/home";


export default async function PageHome({
  params: paramsPromise,
}: PagePropsPromise<object>) {
  const { locale } = await paramsPromise;
  return <Home locale={locale} />;
}
