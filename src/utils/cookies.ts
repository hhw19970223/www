'use client';

import Cookies from 'js-cookie';

export function getCookieDomain() {
  return location.href.includes('://localhost') ? 'localhost' : 'hhw31.com';
}

export const getCookieLocale = () => {
  return Cookies.get('NEXT_LOCALE');
};

export const setCookieLocale = (value: string) => {
  Cookies.set('NEXT_LOCALE', value, {
    expires: 30,
    secure: true,
    sameSite: 'none', //兼容工作台嵌套iframe场景
    domain: getCookieDomain(),
  });
};
