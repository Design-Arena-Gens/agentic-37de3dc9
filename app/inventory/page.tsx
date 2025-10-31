"use client";

import { useStore } from '@/lib/store';
import Link from 'next/link';

export default function InventoryPage() {
  const { products } = useStore();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <Link href="/products" className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Manage Products</Link>
      </div>
      <div className="card">
        <div className="card-header">Stock Overview</div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-6">SKU</th>
                <th className="py-2 pr-6">Name</th>
                <th className="py-2 pr-6">Stock</th>
                <th className="py-2 pr-6">Reorder Level</th>
                <th className="py-2 pr-6">Sell Price</th>
                <th className="py-2 pr-6">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="py-2 pr-6">{p.sku}</td>
                  <td className="py-2 pr-6">{p.name}</td>
                  <td className="py-2 pr-6">{p.stockOnHand} {p.unit}</td>
                  <td className="py-2 pr-6">{p.reorderLevel ?? '-'}</td>
                  <td className="py-2 pr-6">?{p.sellPrice.toFixed(2)}</td>
                  <td className="py-2 pr-6">{p.expiryDate ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
