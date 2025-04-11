'use client';

import { useClientContext } from '@/context/client-context';
import { setCookieLocale } from '@/utils/cookies';
import { getPrimePathnameWithoutLocale } from '@/utils/url';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function useChangeLocale({ locale }: LocaleProp) {
  const router = useRouter();
  const currentPathname = usePathname();
  const [newLocale, setNewLocale] = useState<Locale>(locale);
  /**
   * gets the original locale from the server context, the locale argument
   * could be changed
   */
  const originalLocale = useClientContext()['x-path-locale'];

  const onChangeLocale = useCallback(
    (value: Locale) => {
      setNewLocale(value);
      // set cookie for next-i18n-router
      setCookieLocale(value);

      // 不滚动，定位在当前位置
      const navigateOptions = {
        scroll: false,
      };

      const pathname = getPrimePathnameWithoutLocale({
        locale: originalLocale,
        pathname: currentPathname,
      });

      // redirect to the new locale path
      router.push('/' + value + pathname, navigateOptions);

      router.refresh();
    },
    [currentPathname, originalLocale, router],
  );

  return { onChangeLocale, newLocale };
}
