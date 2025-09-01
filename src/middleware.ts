import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 定義公開路由（不需要登入就能訪問）
const publicPaths = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 檢查是否為公開路由
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // 檢查 Firebase Auth session（使用 Firebase 設定的 cookie）
  const sessionCookie =
    request.cookies.get('__session') ||
    request.cookies.get('auth-token') ||
    request.cookies.get('firebase-auth-token');

  // 如果是需要保護的路由且沒有登入，重定向到登入頁
  if (!isPublicPath && !sessionCookie) {
    const loginUrl = new URL('/login', request.url);
    if (pathname !== '/') {
      loginUrl.searchParams.set('from', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 如果已登入且訪問登入頁，重定向到首頁
  if (isPublicPath && sessionCookie && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 設定 middleware 要執行的路徑
export const config = {
  matcher:
    /*
     * 匹配所有路徑除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - 其他靜態檔案
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*$).*)',
};
