"use client";

import { useStore } from '@/lib/store';

export function Dashboard() {
  const { products, vendors, purchaseOrders, sales } = useStore();
  const totalSkus = products.length;
  const totalVendors = vendors.length;
  const openPOs = purchaseOrders.filter(p => p.status !== 'received').length;
  const totalSales = sales.reduce((sum, s) => sum + s.totalAmount, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total SKUs" value={totalSkus.toString()} />
        <StatCard label="Vendors" value={totalVendors.toString()} />
        <StatCard label="Open POs" value={openPOs.toString()} />
        <StatCard label="Sales (?)" value={totalSales.toFixed(2)} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <div className="card-header">Low Stock Alerts</div>
          <div className="card-body text-sm text-slate-600">No low stock alerts yet.</div>
        </div>
        <div className="card">
          <div className="card-header">Recent Activity</div>
          <div className="card-body text-sm text-slate-600">Nothing to show yet. Add products, vendors, orders.</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-slate-500 text-sm">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
