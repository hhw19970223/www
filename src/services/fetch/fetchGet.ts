import { getCommonHeader } from './getUrl';
import { handleUrlParams } from './handleUrlParams';

interface FetchGet {
  url: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}
export async function fetchGet({ url, params = {}, headers = {} }: FetchGet) {
  return await fetch(handleUrlParams({ url, params }), {
    method: 'GET',
    headers: {
      'x-encrypt': 'false',
      ...getCommonHeader(),
      ...headers,
    },
    next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE || 0) },
  })
    .then((response) => response.json())
    .catch((err) => {
      return {
        code: 500,
        message: err.message,
        data: null,
        success: false,
        error: err.message,
      };
    });
}
