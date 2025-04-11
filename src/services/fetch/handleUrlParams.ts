interface HandleUrlParams {
  url: string;
  params?: Record<string, string>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toQueryString(obj: any) {
  const parts: string[] = [];
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      const array = Array.isArray(obj[i]) ? obj[i] : [obj[i]];
      array.forEach((item: string | number | boolean) => {
        if (item) {
          parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(item));
        }
      });
    }
  }
  return parts.join('&');
}

export function handleUrlParams({ url, params }: HandleUrlParams) {
  let fetchUrl = url;

  if (params && Object.keys(params).length > 0) {
    const queryString = toQueryString(params);
    fetchUrl += `?${queryString}`;
  }

  return fetchUrl;
}
