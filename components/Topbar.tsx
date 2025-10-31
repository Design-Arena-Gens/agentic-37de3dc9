"use client";

import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';

export function Topbar() {
  const [q, setQ] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="container-padding py-3 flex items-center gap-3">
        <button className="lg:hidden p-2 rounded-md hover:bg-slate-50" aria-label="Open Menu">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products, vendors, orders..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <Link href="/reports" className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Generate Report</Link>
      </div>
    </header>
  );
}
