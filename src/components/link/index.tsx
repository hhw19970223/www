import { cn } from '@/utils/cn';
import Link from 'next/link';
import React from 'react';

// export enum LINK_TARGET {
//   BLANK = '_blank',
//   SELF = '_self',
// }

interface Props extends React.HTMLAttributes<HTMLAnchorElement> {
  className?: string;
  href: string;
  target?: '_blank' | '_self';
  children: React.ReactNode;
  customButtonEffect?: boolean;
}
export function NextLink({
  className,
  href,
  children,
  target = '_self',
  customButtonEffect = false,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      prefetch
      target={target}
      className={cn(className, { btn: !customButtonEffect })}
      {...props}
    >
      {children}
    </Link>
  );
}
