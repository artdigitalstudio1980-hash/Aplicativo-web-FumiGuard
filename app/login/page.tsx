/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        const params = new URLSearchParams(window.location.search);
        const redirectPath = params.get('redirect');
        router.push(redirectPath || '/dashboard');
      } else {
        const data = await res.json();
        setError(data.error || 'Error al iniciar sesión');
      }
    } catch {
      setError('Error de red');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-24 px-4 bg-[var(--bg-secondary)]">
      <div className="max-w-sm w-full bg-white p-8 rounded-[var(--radius-xl)] shadow-lg border border-[var(--border-light)]">
        <div className="text-center mb-6">
          <Image src="/img/logo.svg" alt="FUMIGUARD" width={48} height={48} className="mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[var(--text)]">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="font-semibold text-[var(--accent)] hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">
              {error}
            </div>
          )}
          <div>
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              required
              className="form-input"
              placeholder="juan@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="form-label">Contraseña</label>
              <Link href="/forgot-password" className="text-xs font-medium text-[var(--accent)] hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              type="password"
              required
              className="form-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full !py-3.5 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Entrar al Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
