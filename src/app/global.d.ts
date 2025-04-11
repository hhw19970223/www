import { i18n } from 'i18next';

export declare global {
  type Locale = 'en-US' | 'zh-CN';

  type ParamsPromise = Promise<{ locale: Locale }>;

  type SearchParamsPromise<T> = Promise<T>;

  /**
   * T search params; U route params;
   *
   *  normally we shouldn't need to type V, it's automatically inferred from U
   */
  interface PagePropsPromise<T, U extends Params = Params, V = Promise<U>> {
    params: V;
    searchParams: SearchParamsPromise<T>;
  }

  type I18nT = i18n['t'];

  interface I18TProp {
    t: I18nT;
  }

  interface LocaleProp {
    locale: Locale;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
    }
  }
}
