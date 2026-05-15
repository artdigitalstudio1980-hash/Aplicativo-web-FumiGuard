'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Falta el token de recuperación. Por favor solicita un nuevo enlace.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus('error');
      setMessage('Las contraseñas no coinciden.');
      return;
    }
    if (newPassword.length < 6) {
      setStatus('error');
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Contraseña restablecida exitosamente.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al restablecer la contraseña.');
      }
    } catch {
      setStatus('error');
      setMessage('Error de red. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative z-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Nueva Contraseña
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          Ingresa tu nueva contraseña para acceder a Fumiguard.
        </p>
      </div>

      {status === 'success' ? (
        <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-100">
          <h3 className="text-lg font-bold text-emerald-900 mb-2">¡Completado!</h3>
          <p className="text-emerald-700 text-sm mb-4">{message}</p>
          <p className="text-xs font-bold text-emerald-600">Redirigiendo al inicio de sesión...</p>
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          {status === 'error' && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm text-center font-medium border border-red-100">{message}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nueva Contraseña</label>
              <input
                type="password"
                required
                disabled={!token}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
              <input
                type="password"
                required
                disabled={!token}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={status === 'loading' || !token}
              className="btn btn-primary w-full !py-4 text-lg disabled:opacity-50"
            >
              {status === 'loading' ? 'Guardando...' : 'Restablecer Contraseña'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ResetPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
      <Suspense fallback={<div className="p-10 bg-white rounded-2xl shadow">Cargando...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
