"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Package, Users, ShoppingCart, Boxes, FileText, Home, Truck } from 'lucide-react';
import clsx from 'classnames';

const nav = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/inventory', label: 'Inventory', icon: Boxes },
  { href: '/products', label: 'Products', icon: Package },
  { href: '/vendors', label: 'Vendors', icon: Truck },
  { href: '/purchase-orders', label: 'Purchase Orders', icon: ShoppingCart },
  { href: '/sales', label: 'Sales', icon: ShoppingCart },
  { href: '/reports', label: 'Reports', icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="h-screen sticky top-0 p-4 space-y-6">
      <div className="px-2">
        <div className="text-xl font-bold text-brand-700">Convenience ERP</div>
        <div className="text-xs text-slate-500">FMCG & Supply Chain</div>
      </div>
      <nav className="space-y-1">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm',
                active ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-50'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
