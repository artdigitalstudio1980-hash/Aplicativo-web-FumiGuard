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

  if (!user) return <div className="min-h-screen flex items-center justify-center text-[var(--text-muted)]">Cargando...</div>;

  return (
    <div className="min-h-screen bg-[var(--text)] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Dashboard de Cliente</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-lg font-semibold text-white mb-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Mi Perfil</h2>
            <div className="space-y-3 text-sm">
              <p><span className="block text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Nombre</span> <span className="text-white">{user.name}</span></p>
              <p><span className="block text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Email</span> <span className="text-white">{user.email}</span></p>
              <p><span className="block text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Teléfono</span> <span className="text-white">{user.phone || 'No registrado'}</span></p>
              <button className="mt-3 w-full py-2 rounded-lg text-sm transition-colors" style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.06)' }}>
                Editar Perfil
              </button>
            </div>
          </div>

          <div className="p-6 rounded-xl md:col-span-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h2 className="text-lg font-semibold text-white mb-5 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>Mis Servicios Agendados</h2>

            {orders.length === 0 ? (
              <p className="text-center py-8" style={{ color: 'rgba(255,255,255,0.3)' }}>Aún no has solicitado ningún servicio.</p>
            ) : (
              <div className="space-y-3">
                {orders.map((order: any) => (
                  <div key={order.id} className="p-4 rounded-xl flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div>
                      <h3 className="font-semibold text-white capitalize">{order.plagueType}</h3>
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {new Date(order.createdAt).toLocaleDateString()} - {order.propertyType}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block font-semibold text-white">
                        ${new Intl.NumberFormat('es-CO').format(order.totalPrice)} COP
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        order.status === 'PENDING'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
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
