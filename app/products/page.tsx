"use client";

import { useStore } from '@/lib/store';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  sku: z.string().min(1),
  name: z.string().min(1),
  unit: z.enum(['pcs','box','kg','l','pack']),
  costPrice: z.coerce.number().nonnegative(),
  sellPrice: z.coerce.number().nonnegative(),
  stockOnHand: z.coerce.number().int().nonnegative(),
  barcode: z.string().optional(),
  expiryDate: z.string().optional()
});

type FormValues = z.infer<typeof schema>;

export default function ProductsPage() {
  const { products, addProduct } = useStore();
  const [open, setOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    addProduct({ id: crypto.randomUUID(), ...values, categoryId: undefined, vendorId: undefined, reorderLevel: 10 });
    reset();
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Products</h1>
        <button onClick={() => setOpen(true)} className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Add Product</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">New Product</div>
            <div className="card-body">
              <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
                <Input label="SKU" {...register('sku')} error={errors.sku?.message} />
                <Input label="Name" {...register('name')} error={errors.name?.message} className="col-span-2" />
                <Select label="Unit" {...register('unit')} options={['pcs','box','kg','l','pack']} />
                <Input label="Cost Price" type="number" step="0.01" {...register('costPrice')} />
                <Input label="Sell Price" type="number" step="0.01" {...register('sellPrice')} />
                <Input label="Stock On Hand" type="number" {...register('stockOnHand')} />
                <Input label="Barcode" {...register('barcode')} />
                <Input label="Expiry Date" type="date" {...register('expiryDate')} />
                <div className="col-span-2 flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-md border border-slate-200">Cancel</button>
                  <button type="submit" className="px-3 py-2 text-sm rounded-md bg-brand-600 text-white">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">Product List</div>
        <div className="card-body overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-6">SKU</th>
                <th className="py-2 pr-6">Name</th>
                <th className="py-2 pr-6">Price</th>
                <th className="py-2 pr-6">Stock</th>
                <th className="py-2 pr-6">Unit</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-slate-100">
                  <td className="py-2 pr-6">{p.sku}</td>
                  <td className="py-2 pr-6">{p.name}</td>
                  <td className="py-2 pr-6">?{p.sellPrice.toFixed(2)}</td>
                  <td className="py-2 pr-6">{p.stockOnHand}</td>
                  <td className="py-2 pr-6">{p.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  const { label, error, className, ...rest } = props;
  return (
    <label className={`text-sm ${className ?? ''}`}>
      <div className="text-slate-600 mb-1">{label}</div>
      <input {...rest} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-200" />
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  );
}

function Select({ label, options, ...rest }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: string[] }) {
  return (
    <label className="text-sm">
      <div className="text-slate-600 mb-1">{label}</div>
      <select {...rest} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-200">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}
