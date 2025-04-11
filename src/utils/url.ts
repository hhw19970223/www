import { i18nConfig } from "@/components/i18n";

/**
 * Strips the search params from the window url
 */
export const removeSearchParamsKeys = (keys: string[]) => {
  const url = new URL(window.location.href);
  keys.forEach((key) => {
    url.searchParams.delete(key);
  });
  history.pushState(null, '', url.toString());
};

/**
 * Will add or update the search params in the window url
 */
export const setUrlSearchParams = (key: string, value: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  history.pushState(null, '', url.toString());
};

function getLocalePathname(locale: Locale) {
  if (locale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
    return '';
  } else {
    return `/${locale}`;
  }
}


// 获取非多语言的初始路径
export function getPrimePathnameWithoutLocale({
  locale,
  pathname,
}: {
  locale: Locale;
  pathname: string;
}) {
  return pathname.replace(getLocalePathname(locale), '') || '/';
}