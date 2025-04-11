import { initTranslations } from '@/components/i18n';

type Props = LocaleProp;
export async function LayoutFooter({ locale }: Props) {
  const { t } = await initTranslations({
    locale,
    namespaces: [],
  });

  return (
    <footer>
    </footer>
  );
}
