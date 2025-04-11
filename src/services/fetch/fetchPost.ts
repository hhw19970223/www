import { getCommonHeader } from './getUrl';
import { handleUrlParams } from './handleUrlParams';

export interface SetLoading {
  setLoading?: (value: boolean) => void;
}

interface FetchPost extends SetLoading {
  url: string;
  data?: Record<string, string | undefined | boolean>;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

export async function fetchPost({
  url,
  data = {},
  params,
  headers = {},
  setLoading,
}: FetchPost) {
  setLoading?.(true);

  return await fetch(handleUrlParams({ url, params }), {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 不加密
      'x-encrypt': 'false',
      ...getCommonHeader(),
      // 'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((res) => res.json())
    .catch((error) => {
      return {
        success: false,
        message: error,
        data: null,
      };
    });
}
