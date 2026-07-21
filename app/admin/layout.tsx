import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { requireAdmin } from '../../lib/verifyAdmin';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get('token')?.value;
  const payload = requireAdmin(token);

  if (!token) {
    redirect('/login');
  }

  if (!payload) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col pt-32">
        <h2 className="text-xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Admin Panel</h2>
        <nav className="flex-1 space-y-2">
          <a href="/admin" className="block px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 font-medium">Órdenes</a>
          <a href="/admin/users" className="block px-4 py-2 rounded-xl hover:bg-slate-800 text-slate-300 transition-colors">Usuarios</a>
        </nav>
      </aside>
      <main className="flex-1 p-8 pt-32">
        {children}
      </main>
    </div>
  );
}
