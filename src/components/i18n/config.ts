import { Config } from 'next-i18n-router/dist/types';

export interface LocaleOption {
  label: string;
  key: Locale;
}

const LOCALES: Readonly<Locale[]> = ['en-US', 'zh-CN'] as const;

const DEFAULT_LOCALE = 'en-US';

export const i18nConfig: Readonly<Config> = {
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  // 如果为 false，默认的地址为 /，相反如果为true，假设默认语言为 en，地址则为 /en
  prefixDefault: false,
  cookieOptions: {
    // 目前测试下来对 localhost 的逻辑没什么影响 @林志鹏
    // 加 domain 是为了解决在 test/pre 环境下，服务器端会下发一个 {test|pre}-www.zibird.com 的 cookie，导致无法读取到
    // .zibird.com 的 locale cookie。
    domain: '.zibird.com',
    secure: true,
    sameSite: 'none', //兼容工作台嵌套iframe场景
  },
};

export const localeMap = {
  ['en-US']: 'English',
  ['zh-CN']: '简体中文',
} as const;

export const optionsLocale: LocaleOption[] = LOCALES.map((item) => {
  return {
    label: localeMap[item],
    key: item,
  };
});
