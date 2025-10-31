"use client";

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { generatePdf, generateDocx, type ReportType } from '@/lib/report';

const reportOptions: { value: ReportType; label: string }[] = [
  { value: 'inventory', label: 'Inventory' },
  { value: 'inventory-valuation', label: 'Inventory Valuation' },
  { value: 'vendor-performance', label: 'Vendor Performance' },
  { value: 'sales-summary', label: 'Sales Summary' },
];

export default function ReportsPage() {
  const state = useStore();
  const [report, setReport] = useState<ReportType>('inventory');
  const [busy, setBusy] = useState(false);

  const download = async (format: 'pdf' | 'docx') => {
    setBusy(true);
    try {
      let blob: Blob;
      if (format === 'pdf') {
        blob = generatePdf(state, report);
      } else {
        blob = await generateDocx(state, report);
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${report}-${new Date().toISOString().slice(0,10)}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Reports</h1>
      <div className="card max-w-2xl">
        <div className="card-header">Generate Report</div>
        <div className="card-body space-y-4">
          <label className="text-sm block">
            <div className="text-slate-600 mb-1">Report Type</div>
            <select value={report} onChange={(e) => setReport(e.target.value as ReportType)} className="w-full px-3 py-2 border border-slate-200 rounded-md">
              {reportOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <button disabled={busy} onClick={() => download('pdf')} className="px-3 py-2 text-sm rounded-md bg-brand-600 text-white disabled:opacity-50">Download PDF</button>
            <button disabled={busy} onClick={() => download('docx')} className="px-3 py-2 text-sm rounded-md border border-slate-200">Download DOCX</button>
          </div>
          <p className="text-xs text-slate-500">Exports are generated locally in your browser using current data.</p>
        </div>
      </div>
    </div>
  );
}
