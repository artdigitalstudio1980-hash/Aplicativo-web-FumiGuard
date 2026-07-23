'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Se ha enviado un enlace de recuperación a tu correo.');
      } else {
        setStatus('error');
        setMessage(data.error || 'Error al solicitar la recuperación.');
      }
    } catch {
      setStatus('error');
      setMessage('Error de red. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-4 bg-[var(--bg-secondary)]">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-[var(--radius-2xl)] shadow-lg border border-[var(--border-light)]">
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Volver al inicio de sesión
          </Link>
        </div>

        {status === 'success' ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-light)] flex items-center justify-center mx-auto mb-4" style={{ color: 'var(--accent)' }}>
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-lg font-bold text-[var(--text)] mb-2">¡Solicitud enviada!</h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">{message}</p>
            <p className="text-xs text-[var(--text-muted)]">Revisa tu bandeja de entrada y la carpeta de spam.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[var(--text)]">Recuperar Contraseña</h2>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </div>
            <form className="space-y-5" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center font-medium border border-red-100">{message}</div>
              )}
              <div>
                <label className="form-label">Correo Electrónico</label>
                <input type="email" required className="form-input" placeholder="juan@ejemplo.com"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <button type="submit" disabled={status === 'loading'}
                className="btn btn-primary w-full !py-3.5 disabled:opacity-50">
                {status === 'loading' ? 'Enviando...' : 'Enviar enlace de recuperación'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
