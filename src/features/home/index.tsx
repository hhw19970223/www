import { initTranslations } from '@/components/i18n';
import { Section1 } from './section/section1';
export async function Home({ locale }: LocaleProp) {
  const { t } = await initTranslations({
    locale,
    namespaces: ['home'],
  });

  return (
    <main>
      <Section1 locale={locale} />
      <Section1 locale={locale} />
    </main>
  );
}
