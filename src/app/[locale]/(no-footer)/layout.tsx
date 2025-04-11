import { LayoutHeader } from '@/components/layouts';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { LocaleRootLayoutProps } from '../layout';
import { ConfigProvider } from 'antd';

export default async function NoFooterLayout({
  children,
  params: paramsPromise,
}: LocaleRootLayoutProps) {
  const { locale } = await paramsPromise;

  return (
    <AntdRegistry>
      <ConfigProvider theme={{ token: {colorPrimary: '#6c4aff' }}}>
      <div className='h-screen w-screen flex flex-col'>
        <LayoutHeader locale={locale} />
        <div className='flex-1'>
          {children}
        </div>
      </div>
      </ConfigProvider>
      
    </AntdRegistry>
  );
}
