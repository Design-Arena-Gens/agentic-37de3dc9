"use client";

import { useStore } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

const schema = z.object({
  name: z.string().min(1),
  contactName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  leadTimeDays: z.coerce.number().int().nonnegative().optional(),
});
type FormValues = z.infer<typeof schema>;

export default function VendorsPage() {
  const { vendors, addVendor } = useStore();
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (values: FormValues) => {
    addVendor({ id: crypto.randomUUID(), ...values, rating: 5, address: '' });
    reset();
    setOpen(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Vendors</h1>
        <button onClick={() => setOpen(true)} className="text-sm px-3 py-2 rounded-md bg-brand-600 text-white hover:bg-brand-700">Add Vendor</button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg card" onClick={(e) => e.stopPropagation()}>
            <div className="card-header">New Vendor</div>
            <div className="card-body">
              <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>
                <Input label="Name" className="col-span-2" {...register('name')} error={errors.name?.message} />
                <Input label="Contact Name" {...register('contactName')} />
                <Input label="Phone" {...register('phone')} />
                <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
                <Input label="Lead Time (days)" type="number" {...register('leadTimeDays')} />
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
        <div className="card-header">Vendor List</div>
        <div className="card-body text-sm">
          <ul className="space-y-2">
            {vendors.map((v) => (
              <li key={v.id} className="flex items-center justify-between border-b last:border-b-0 border-slate-100 pb-2">
                <div>
                  <div className="font-medium">{v.name}</div>
                  <div className="text-slate-500 text-xs">Lead time: {v.leadTimeDays ?? '-'} days</div>
                </div>
                <button className="text-xs px-2 py-1 rounded-md border border-slate-200 hover:bg-slate-50">View</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; className?: string }) {
  const { label, error, className, ...rest } = props;
  return (
    <label className={`text-sm ${className ?? ''}`}>
      <div className="text-slate-600 mb-1">{label}</div>
      <input {...rest} className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-200" />
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </label>
  );
}
