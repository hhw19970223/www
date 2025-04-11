import { SVGAttributes } from 'react';

export function ISvgMenu(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        d="M65.012178 128.544655 65.012178 230.875275 959.381795 230.875275 959.381795 128.544655 65.012178 128.544655Z"
        fill="currentColor"
      ></path>
      <path
        d="M64.729745 563.201126 959.269231 563.201126 959.269231 460.870506 64.729745 460.870506 64.729745 563.201126Z"
        fill="currentColor"
      ></path>
      <path
        d="M64.729745 895.525953 959.269231 895.525953 959.269231 793.195334 64.729745 793.195334 64.729745 895.525953Z"
        fill="currentColor"
      ></path>
      <path d="M64.729745 889.742227" fill="currentColor"></path>
    </svg>
  );
}
