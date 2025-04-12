import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE = 'blog_admin_auth';
const ADMIN_PASSWORD = process.env.BLOG_ADMIN_PASSWORD || 'your-secure-password';  // Should be set in .env

export async function checkAuth() {
  const cookieStore = cookies();
  const isAuth = cookieStore.get(ADMIN_COOKIE)?.value === ADMIN_PASSWORD;
  
  if (!isAuth) {
    redirect('/admin/login');
  }
}

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    cookies().set(ADMIN_COOKIE, ADMIN_PASSWORD, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });
    return true;
  }
  return false;
} 