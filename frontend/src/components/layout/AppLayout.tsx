'use client';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!token && pathname !== '/login') {
      router.push('/login');
    } else if (token && pathname === '/login') {
      router.push('/dashboard');
    } else if (token && pathname === '/') {
      router.push('/dashboard');
    }
  }, [mounted, token, router, pathname]);

  const isLoginPage = pathname === '/login';
  const showLayout = mounted && token && !isLoginPage;
  const showChildren = mounted && (isLoginPage || token);

  return (
    <>
      {showLayout ? (
        <div className="flex h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
          {/* Background gradients */}
          <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-purple-50 opacity-70"></div>

          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-8 relative">
              <div className="mx-auto max-w-6xl">
                {children}
              </div>
            </main>
          </div>
        </div>
      ) : showChildren ? (
        <>{children}</>
      ) : null}
    </>
  );
}
