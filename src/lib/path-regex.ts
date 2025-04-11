import { TDK } from '@/services/tdk';
import { match, MatchFunction } from 'path-to-regexp';

type MyMatchFunction = MatchFunction<
  Partial<Record<string, string | string[]>>
>;

export class PathRegex {
  regexMap: Map<
    string,
    {
      match: MyMatchFunction;
      tdkByLang: Partial<Record<Locale, TDK>>;
    }
  >;

  whildcardRegexMap: Map<string, { match: MyMatchFunction }>;

  constructor() {
    this.regexMap = new Map();
    this.whildcardRegexMap = new Map();
  }

  /**
   * 更新已有数据，如果没有的话删除
   */
  updateAndRemove(data: TDK[]) {
    const swapMap: typeof this.regexMap = new Map();
    data.forEach((item) => {
      const updated = this.update(item.pageId, item);
      if (updated) {
        swapMap.set(item.pageId, updated);
      }
    });
    this.regexMap = swapMap;
  }

  update(path: string, tdk: TDK) {
    if (this.regexMap.has(path)) {
      const value = this.regexMap.get(path)!;
      value.tdkByLang[tdk.lang] = tdk;
      return value;
    }
    try {
      this.regexMap.set(path, {
        match: match(path),
        tdkByLang: {
          [tdk.lang]: tdk,
        },
      });
      return this.regexMap.get(path)!;
    } catch {
      return undefined;
    }
  }

  getTdk(path: string, lang: Locale) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, value] of this.regexMap) {
      if (value.match(path)) {
        return value.tdkByLang[lang];
      }
    }
    return undefined;
  }
}
