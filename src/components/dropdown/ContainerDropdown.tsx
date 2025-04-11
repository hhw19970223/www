'use client';

import { Dropdown, DropdownProps } from 'antd';

export function ContainerDropdown(props: DropdownProps) {
  return (
    <Dropdown
      getPopupContainer={(triggerNode) =>
        triggerNode.parentElement || document.body
      }
      {...props}
    />
  );
}
