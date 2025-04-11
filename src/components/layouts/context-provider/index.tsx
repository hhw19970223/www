'use client';
import { ClientContext } from '@/context/client-context';
import { ServerHeaderContext } from '@/context/server-header-context';

/**
 * 传递 server context 到 client context
 */
export function ContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: ServerHeaderContext;
}) {
  return (
    <ClientContext.Provider value={value}>{children}</ClientContext.Provider>
  );
}
