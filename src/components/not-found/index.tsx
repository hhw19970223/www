import { initTranslations } from '../i18n';
import { getServerHeaderContext } from '@/context/server-header-context';

interface NotFoundProps {
  text?: string;
  linkText?: string;
  linkPath?: string;
}

export async function NotFound(props: NotFoundProps) {
  const locale = await getServerHeaderContext('x-path-locale');
  const { t } = await initTranslations({
    locale,
    namespaces: [],
  });

  const text = props.text || t('global:notFound.pageNotFound');


  return (
    <main className="min-h-[800px] pt-60 text-center">
      <h1 className="px-4 text-black/88">
        {text}
      </h1>
    </main>
  );
}
