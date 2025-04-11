'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initTranslations, initTranslationsProps } from './initTranslations';
import { ReactNode } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { useTranslation } from './useTranslation';

interface Props extends Omit<initTranslationsProps, 'i18nInstance'> {
  children: ReactNode;
}

/**
 * @deprecated 这个用法 nextjs 有问题，请用适配过的 {@link useTranslation}
 */
export function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: Props) {
  const i18n = createInstance();

  initTranslations({
    locale,
    namespaces,
    i18nInstance: i18n,
    resources,
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
