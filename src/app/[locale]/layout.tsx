// import { Geist, Geist_Mono } from 'next/font/google';
import type { Metadata } from 'next';
import '@/app/globals.css';
import { ContextProvider } from '@/components/layouts/context-provider';
import { getServerHeaderContextObject } from '@/context/server-header-context';
import {
  Initialization,
} from '@/components/layouts';
// antd react 19 补丁，要不然有些组件用不了
// https://ant.design/docs/react/v5-for-19
import '@ant-design/v5-patch-for-react-19';

/**
 * 根据接口获取 TDK 数据
 */
export async function generateMetadata({}: Pick<LocaleRootLayoutProps, 'params'>): Promise<Metadata> {
  return {
    title: '',
    description: '',
    keywords: '',
  };
}

export type LocaleRootLayoutProps = Readonly<{
  children: React.ReactNode;
  params: ParamsPromise;
}>;

export default async function LocaleRootLayout({
  children,
  params: paramsPromise,
}: LocaleRootLayoutProps) {
  const params = await paramsPromise;

  const { locale } = params;

  const headersValues = await getServerHeaderContextObject();

  return (
    <html lang={locale}>
      <body className='overflow-x-hidden'>
        <ContextProvider value={{ ...headersValues }}>
          <Initialization />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
