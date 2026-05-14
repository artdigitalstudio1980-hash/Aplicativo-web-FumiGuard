/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, these should use SWR or React Query
    const fetchData = async () => {
      try {
        const profileRes = await fetch('/api/users/profile');
        if (!profileRes.ok) throw new Error('Not authenticated');
        const userData = await profileRes.json();
        setUser(userData);

        const ordersRes = await fetch('/api/orders');
        if (ordersRes.ok) {
          setOrders(await ordersRes.json());
        }
      } catch (err) {
        router.push('/login');
      }
    };
    fetchData();
  }, [router]);

  if (!user) return <div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>;

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard de Cliente</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Widget */}
          <div className="glass-panel p-8 rounded-2xl md:col-span-1">
            <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-4">Mi Perfil</h2>
            <div className="space-y-4">
              <p><span className="text-gray-400 block text-sm">Nombre</span> {user.name}</p>
              <p><span className="text-gray-400 block text-sm">Email</span> {user.email}</p>
              <p><span className="text-gray-400 block text-sm">Teléfono</span> {user.phone || 'No registrado'}</p>
              <button className="mt-4 w-full py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="glass-panel p-8 rounded-2xl md:col-span-2">
            <h2 className="text-xl font-semibold mb-6 border-b border-white/10 pb-4">Mis Servicios Agendados</h2>
            
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Aún no has solicitado ningún servicio.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order: any) => (
                  <div key={order.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-emerald-400 capitalize">{order.plagueType}</h3>
                      <p className="text-sm text-gray-400">{new Date(order.createdAt).toLocaleDateString()} - {order.propertyType}</p>
                    </div>
                    <div className="text-right">
                      <span className="block font-bold">${new Intl.NumberFormat('es-CO').format(order.totalPrice)} COP</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
