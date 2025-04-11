'use client';

import { useClientContext } from '@/context/client-context';
import { useChangeLocale } from '@/hooks/useChangeLocale';
import { useEffect } from 'react';
import { i18nConfig } from '@/components/i18n';
import { getCookieLocale } from '@/utils/cookies';

export function DetectLanguageChange() {
  const locale = useClientContext()['x-path-locale'];
  const { onChangeLocale } = useChangeLocale({ locale });

  useEffect(() => {
    const cookieLocale = getCookieLocale();
    const handler = () => {
      if (getCookieLocale() !== cookieLocale) {
        onChangeLocale(
          (getCookieLocale() as Locale) ?? i18nConfig.defaultLocale,
        );
      }
    };
    window.document.addEventListener('visibilitychange', handler);
    return () => {
      window.document.removeEventListener('visibilitychange', handler);
    };
  }, [onChangeLocale]);
  return null;
}
