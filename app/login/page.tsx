/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error de red');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative z-10">
        <div className="text-center mb-10">
          <img src="/img/logo.png" alt="FUMIGUARD" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Iniciar Sesión
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
              Regístrate aquí
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm text-center font-medium border border-red-100">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="juan@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn btn-primary w-full !py-4 text-lg"
            >
              Entrar al Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
