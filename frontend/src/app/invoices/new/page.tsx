'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';

export default function NewInvoicePage() {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customerId: '',
    invoiceNumber: `INV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
  });
  
  const [items, setItems] = useState([{ description: '', quantity: 1, unitPrice: 0 }]);

  useEffect(() => {
    api.get('/customers').then(res => setCustomers(res.data));
  }, []);

  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerId) return alert('Please select a customer');
    
    try {
      await api.post('/invoices', {
        ...formData,
        customerId: parseInt(formData.customerId),
        date: new Date(formData.date).toISOString(),
        dueDate: new Date(formData.dueDate).toISOString(),
        items: items.map(i => ({ ...i, quantity: Number(i.quantity), unitPrice: Number(i.unitPrice) }))
      });
      router.push('/invoices');
    } catch (err) {
      console.error(err);
      alert('Error creating invoice');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create Invoice</h2>
        <p className="text-slate-500 mt-1">Generate a new invoice for a customer.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Invoice Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Customer</label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.customerId}
                onChange={e => setFormData({...formData, customerId: e.target.value})}
                required
              >
                <option value="">Select Customer...</option>
                {customers.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Invoice Number</label>
              <Input value={formData.invoiceNumber} onChange={e => setFormData({...formData, invoiceNumber: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} required />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Line Items</CardTitle>
            <Button type="button" variant="outline" size="sm" onClick={addItem}>
              <Plus className="h-4 w-4 mr-2"/> Add Item
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex gap-4 items-start bg-slate-50 p-4 rounded-lg border border-slate-200/60">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500">Description</label>
                    <Input value={item.description} onChange={e => updateItem(index, 'description', e.target.value)} required placeholder="Item description" />
                  </div>
                  <div className="w-24 space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500">Qty</label>
                    <Input type="number" min="1" value={item.quantity} onChange={e => updateItem(index, 'quantity', e.target.value)} required />
                  </div>
                  <div className="w-32 space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500">Price</label>
                    <Input type="number" step="0.01" min="0" value={item.unitPrice} onChange={e => updateItem(index, 'unitPrice', e.target.value)} required />
                  </div>
                  <div className="w-24 space-y-2">
                    <label className="text-xs font-semibold uppercase text-slate-500">Total</label>
                    <div className="h-10 flex items-center font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</div>
                  </div>
                  {items.length > 1 && (
                    <div className="pt-7">
                      <Button type="button" variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2" onClick={() => removeItem(index)}>
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-end pt-4 border-t border-slate-200 mt-4">
                <div className="text-xl font-bold">
                  Total Amount: <span className="text-blue-600">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push('/invoices')}>Cancel</Button>
          <Button type="submit" className="w-48 text-lg">Create Invoice</Button>
        </div>
      </form>
    </div>
  );
}
