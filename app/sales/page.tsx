"use client";

import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function SalesPage() {
  const { sales, products, addSale } = useStore();
  const [qty, setQty] = useState(1);
  const [productId, setProductId] = useState(products[0]?.id);

  const createQuickSale = () => {
    const p = products.find((x) => x.id === productId) ?? products[0];
    if (!p) return;
    const total = p.sellPrice * qty;
    addSale({ id: crypto.randomUUID(), saleDate: new Date().toISOString(), lines: [{ productId: p.id, quantity: qty, unitPrice: p.sellPrice }], totalAmount: total });
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Sales</h1>
        <div className="flex items-center gap-2">
          <select value={productId} onChange={(e) => setProductId(e.target.value)} className="px-3 py-2 border border-slate-200 rounded-md text-sm">
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <input type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} className="w-24 px-3 py-2 border border-slate-200 rounded-md text-sm" />
          <button onClick={createQuickSale} className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Add Sale</button>
        </div>
      </div>
      <div className="card">
        <div className="card-header">Recent Sales</div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-6">Sale ID</th>
                <th className="py-2 pr-6">Date</th>
                <th className="py-2 pr-6">Items</th>
                <th className="py-2 pr-6">Total</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((s) => (
                <tr key={s.id} className="border-t border-slate-100">
                  <td className="py-2 pr-6">{s.id.slice(0,8)}</td>
                  <td className="py-2 pr-6">{new Date(s.saleDate).toLocaleString()}</td>
                  <td className="py-2 pr-6">{s.lines.map(l => products.find(p => p.id === l.productId)?.name ?? 'Item').join(', ')}</td>
                  <td className="py-2 pr-6">?{s.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
