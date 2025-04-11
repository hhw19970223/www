import { TRAN_GLOBAL } from "@/locales/types/global.types";

export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
  olnyFooter?: boolean;
};

export const PATHNAME_ROOT = '/';
// 首页
export const PATHNAME_HOME = PATHNAME_ROOT;
//产品
export const PATHNAME_PRODUCTS = '/products';
//合作伙伴
export const PATHNAME_PARTNERS = '/partners';
// 关于我们
export const PATHNAME_ABOUT_US = '/about-us';
// 服务条款
export const PATHNAME_TERMS_OF_SERVICE = '/terms-of-service';

export function getMenuData(t: I18nT): Menu[] {
  return [
    {
      id: 1,
      title: t(TRAN_GLOBAL.home),
      path: PATHNAME_HOME,
      newTab: false,
    },
    {
      id: 2,
      title: t(TRAN_GLOBAL.products),
      path: PATHNAME_PRODUCTS,
      newTab: false,
    },
    {
      id: 3,
      title: t(TRAN_GLOBAL.partners),
      path: PATHNAME_PARTNERS,
      newTab: false,
    },
    {
      id: 4,
      title: t(TRAN_GLOBAL.about),
      path: PATHNAME_ABOUT_US,
      newTab: false,
    },
    {
      id: 5,
      title: "Pages",
      newTab: false,
      submenu: [
        {
          id: 51,
          title: "About Page",
          path: "/about",
          newTab: false,
        },
        {
          id: 52,
          title: "Contact Page",
          path: "/contact",
          newTab: false,
        },
      ],
    },
  ];
}