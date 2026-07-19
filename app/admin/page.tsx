'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<{
    id: string; plagueType: string; propertyType: string; areaSize: number;
    totalPrice: number; status: string; createdAt: string;
    user: { name: string; email: string; phone?: string };
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Gestión de Órdenes</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">ID Orden</th>
              <th className="px-6 py-4">Cliente</th>
              <th className="px-6 py-4">Servicio</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs">{order.id.split('-')[0]}</td>
                <td className="px-6 py-4">
                  {order.user?.name}<br/>
                  <span className="text-xs text-slate-500">{order.user?.email}</span>
                </td>
                <td className="px-6 py-4">{order.plagueType}</td>
                <td className="px-6 py-4 font-bold text-emerald-400">${new Intl.NumberFormat('es-CO').format(order.totalPrice)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    order.status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' :
                    order.status === 'CONFIRMED' ? 'bg-blue-500/20 text-blue-400' :
                    order.status === 'CANCELLED' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-slate-300 focus:border-emerald-500 outline-none"
                  >
                    <option value="PENDING">Pendiente</option>
                    <option value="CONFIRMED">Confirmado / Pagado</option>
                    <option value="COMPLETED">Completado</option>
                    <option value="CANCELLED">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No hay órdenes registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
