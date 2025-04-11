import { headers } from 'next/headers';

export interface ServerHeaderContext {
  /**
   * The path that is being rendered. The path includes the locale.
   */
  'x-request-pathname': string;
  /**
   * The locale of the current path. This value is injected by the server, so it
   * will always reflect the current rendering locale.
   */
  'x-path-locale': Locale;
}
/**
 * @returns The header context to be used in the server components.
 */
export async function getServerHeaderContext<
  K extends keyof ServerHeaderContext,
>(key: K): Promise<ServerHeaderContext[K]> {
  return (await headers()).get(key) as ServerHeaderContext[K];
}

/**
 * @returns The header context as an object to be used in the server components.
 */
export async function getServerHeaderContextObject(): Promise<ServerHeaderContext> {
  const headersList = await headers();
  return {
    'x-request-pathname': headersList.get('x-request-pathname')!,
    'x-path-locale': headersList.get('x-path-locale')! as Locale,
  };
}
