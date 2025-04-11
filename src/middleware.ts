import { i18nRouter } from 'next-i18n-router';
import { NextRequest, NextResponse } from 'next/server';
import { i18nConfig } from './components/i18n';

// 我们在这里设置了用 header 建立了一个 server context，用于存储全局的一些信息。
// 之前尝试用 async storage 包一层，但是 next 新版本不生效了，所以改用 header
// （这个 stackoverflow 答案说 next 13 header 也是用 async storage 实现的 source： https://stackoverflow.com/questions/75138346/nextjs-how-can-i-create-a-server-side-request-context）。
// 另外这篇文章介绍了几种 server/client context share 的实现方式：https://prismic.io/blog/advanced-nextjs-server-context

// header can only be set in middleware since we are using app router, which streams the page as we are rendering in the server
// the header might already be sent before server components are rendered

// type definition in context/server-context.ts
export function middleware(request: NextRequest) {
  // https://www.reddit.com/r/nextjs/comments/1euu4vq/server_action_returning_undefined_on_client_even/
  // if it's server action, just let next handle it without any modification
  if (request.headers.get('accept') === 'text/x-component') {
    return NextResponse.next();
  }
  // @TODO
  // 其他类似图片等静态资源需不需要直接返回 nextResponse.next()?

  const nextResponse = i18nRouter(request, i18nConfig);
  const { pathname } = new URL(request.url);
  nextResponse.headers.set('x-request-pathname', pathname);
  // 从 i18nRouter 中获取到的 locale
  // https://github.com/i18nexus/next-i18n-router/blob/86463a9e725878714ecc78388005639f35283e0c/src/i18nRouter.ts#L163
  nextResponse.headers.set(
    'x-path-locale',
    nextResponse.headers.get('x-next-i18n-router-locale') ?? 'en-US',
  );
  return nextResponse;
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
