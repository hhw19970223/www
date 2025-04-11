import { createContext, useContext } from 'react';
import { ServerHeaderContext } from './server-header-context';

export const ClientContext = createContext<ServerHeaderContext>(
  {
    'x-path-locale': 'en-US',
    'x-request-pathname': '',
  },
);

/**
 * 获取 client 全局上下文。
 */
export function useClientContext() {
  return useContext(ClientContext);
}
