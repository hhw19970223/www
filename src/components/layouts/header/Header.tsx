'use client'

import { Menu } from "@/const/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LocaleSwitcher } from "./locale-switcher";
import { ContainerDropdown } from "@/components/dropdown/ContainerDropdown";
import { ISvgDown } from "@/components/svg/ISvgDown";

type Props = LocaleProp & {
  menuData: Menu[];
};
export function Header({ menuData, locale }: Props) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 1) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);

    return () => {
      window.removeEventListener("scroll", handleStickyNavbar);
    };
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${sticky
          ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute bg-transparent"
          }`}
      >
        <div className="container w-full mx-auto px-4">
          <div className="relative -mx-4 flex items-center justify-between h-20">
            <div className=" max-w-full px-4 xl:mr-12">
              <div className="aspect-[481/279] h-20">
                <Image
                  src="/images/logo.svg"
                  alt="logo"
                  width={481}
                  height={279}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${navbarOpen ? " top-[7px] rotate-45" : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 ${navbarOpen ? "opacity-0 " : " "
                      }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300  ${navbarOpen ? " top-[-8px] -rotate-45" : " "
                      }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${navbarOpen
                    ? "visibility top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                    }`}
                >
                  <ul className="lg:flex lg:space-x-12 flex items-center">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            href={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex ${usePathName === menuItem.path
                              ? "text-primary "
                              : "text-dark hover:text-primary "
                              }`}
                          >
                            {menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <ContainerDropdown
                              menu={{
                                items: menuItem.submenu?.map((submenuItem, index) => {
                                  return {
                                    label: <Link
                                      href={submenuItem.path || ''}
                                      key={index}
                                      className="block rounded py-2 text-sm text-dark hover:text-primary lg:px-3 whitespace-nowrap"
                                    >
                                      {submenuItem.title}
                                    </Link>,
                                    key: index
                                  }
                                })
                              }}
                              trigger={['click']}
                              placement="bottom"
                            >
                              <p
                                onClick={() => handleSubmenu(index)}
                                className="flex cursor-pointer items-center justify-between gap-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:px-0 py-2"
                              >
                                {menuItem.title}
                                <ISvgDown />
                              </p>
                            </ContainerDropdown>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                <LocaleSwitcher locale={locale} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}