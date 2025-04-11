'use client';

import i18next, { FlatNamespace, KeyPrefix } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import {
  FallbackNs,
  initReactI18next,
  UseTranslationOptions,
  useTranslation as useTranslationOrg,
} from 'react-i18next';
import { i18nConfig } from './config';
import { useClientContext } from '@/context/client-context';

type $Tuple<T> = readonly [T?, ...T[]];

// https://www.locize.com/blog/next-app-dir-i18n
i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: Locale, namespace: string) =>
        import(`@/locales/${language}/${namespace}.json`),
    ),
  )
  .init({
    lng: undefined, // let detect the language on client side
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
  });

/**
 * 正常使用可以不用传语言，默认使用当前语言，如果需要获取其他翻译语言，请在 option.lng 里面传入。
 */
export function useTranslation<
  Ns extends FlatNamespace | $Tuple<FlatNamespace> | undefined = undefined,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined,
>(ns?: Ns, options?: UseTranslationOptions<KPrefix>) {
  const currLocale = useClientContext()['x-path-locale'];
  const ret = useTranslationOrg(ns, { lng: currLocale, ...options });
  return ret;
}
