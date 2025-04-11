import { AntdRegistry } from '@ant-design/nextjs-registry';
import { LocaleRootLayoutProps } from '../layout';
import { LayoutFooter, LayoutHeader } from '@/components/layouts';

export default async function WithNavigationBarLayout({
  children,
  params: paramsPromise,
}: LocaleRootLayoutProps) {
  const { locale } = await paramsPromise;

  return (
    <AntdRegistry>
      <LayoutHeader locale={locale} />
      {children}
      <LayoutFooter locale={locale} />
    </AntdRegistry>
  );
}
