"use client";

import { useStore } from '@/lib/store';
import { useState } from 'react';

export default function PurchaseOrdersPage() {
  const { purchaseOrders, vendors, products, addPurchaseOrder, updatePurchaseOrderStatus, receivePurchaseOrder } = useStore();
  const [creating, setCreating] = useState(false);

  const createQuickPO = () => {
    if (vendors.length === 0 || products.length === 0) return;
    const po = {
      id: crypto.randomUUID(),
      vendorId: vendors[0].id,
      orderDate: new Date().toISOString(),
      status: 'ordered' as const,
      lines: [{ productId: products[0].id, quantity: 20, unitCost: products[0].costPrice }]
    };
    addPurchaseOrder(po);
    setCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Purchase Orders</h1>
        <button onClick={() => setCreating(true)} className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">New PO</button>
      </div>

      {creating && (
        <div className="text-sm text-slate-600">Quick create will generate a sample PO using the first vendor and product. <button onClick={createQuickPO} className="text-brand-700 underline">Create now</button></div>
      )}

      <div className="card">
        <div className="card-header">All Purchase Orders</div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-6">PO ID</th>
                <th className="py-2 pr-6">Vendor</th>
                <th className="py-2 pr-6">Date</th>
                <th className="py-2 pr-6">Status</th>
                <th className="py-2 pr-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id} className="border-t border-slate-100">
                  <td className="py-2 pr-6">{po.id.slice(0,8)}</td>
                  <td className="py-2 pr-6">{vendors.find(v => v.id === po.vendorId)?.name ?? '-'}</td>
                  <td className="py-2 pr-6">{new Date(po.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 pr-6 capitalize">{po.status}</td>
                  <td className="py-2 pr-6 flex gap-2">
                    {po.status !== 'received' && (
                      <button onClick={() => receivePurchaseOrder(po.id)} className="px-2 py-1 text-xs rounded-md border border-slate-200 hover:bg-slate-50">Mark Received</button>
                    )}
                    {po.status === 'draft' && (
                      <button onClick={() => updatePurchaseOrderStatus(po.id, 'ordered')} className="px-2 py-1 text-xs rounded-md border border-slate-200 hover:bg-slate-50">Order</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
