import { createInstance, i18n, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from './config';

export interface initTranslationsProps {
  locale: string;
  namespaces: string[];
  i18nInstance?: i18n;
  resources?: Resource;
  // 隐私政策等纯静态页，不需要 layout 这种组件，不需要导入
  withoutGlobalNamespace?: boolean;
}

export async function initTranslations({
  locale,
  namespaces: namespacesInitial,
  i18nInstance,
  resources,
  withoutGlobalNamespace,
}: initTranslationsProps) {
  const namespacesWithGlobal = [...namespacesInitial, 'global'];

  const namespaces = withoutGlobalNamespace
    ? namespacesInitial
    : namespacesWithGlobal;

  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((language: Locale, namespace: string) => {
        const resources = import(`@/locales/${language}/${namespace}.json`);
        return resources;
      }),
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}
