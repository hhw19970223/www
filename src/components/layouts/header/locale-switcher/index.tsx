'use client';

import { localeMap, optionsLocale } from '@/components/i18n';
import { MenuProps } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useChangeLocale } from '@/hooks/useChangeLocale';
import { ContainerDropdown } from '@/components/dropdown/ContainerDropdown';
import { ISvgDown } from '@/components/svg/ISvgDown';

export function LocaleSwitcher({ locale }: LocaleProp) {
  const { newLocale, onChangeLocale } = useChangeLocale({ locale });

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === locale) {
      return;
    }
    onChangeLocale(key as Locale);
  };

  return (
    <ContainerDropdown
      menu={{
        items: optionsLocale,
        onClick,
      }}
      trigger={['click']}
      placement="bottom"
    >
      <button className={`btn flex items-center gap-1.5 py-2 text-base text-(--menu-color) lg:text-dark`}>
        <GlobalOutlined />
        <span>{localeMap[newLocale]}</span>
        <ISvgDown />
      </button>
    </ContainerDropdown>
  );
}
