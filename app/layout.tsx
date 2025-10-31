import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Convenience Store ERP',
  description: 'Inventory, Vendors, FMCG tracking, and Reports',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>        
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block border-r border-slate-200 bg-white">
            <Sidebar />
          </aside>
          <div className="flex flex-col min-h-screen">
            <Topbar />
            <main className="flex-1 container-padding py-6">
              {children}
            </main>
            <footer className="container-padding py-4 text-sm text-slate-500">
              <div className="flex items-center justify-between">
                <p>? {new Date().getFullYear()} Convenience ERP</p>
                <div className="space-x-4">
                  <Link href="/reports" className="hover:underline">Reports</Link>
                  <Link href="/inventory" className="hover:underline">Inventory</Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
