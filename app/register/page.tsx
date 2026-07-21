'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function capitalizeName(value: string) {
  return value.replace(/\b\w/g, c => c.toUpperCase());
}

function generateStrongPassword() {
  const length = 16;
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';
  const special = '!@#$%&*_-';
  const all = upper + lower + digits + special;

  let password = '';
  password += upper[Math.floor(Math.random() * upper.length)];
  password += lower[Math.floor(Math.random() * lower.length)];
  password += digits[Math.floor(Math.random() * digits.length)];
  password += special[Math.floor(Math.random() * special.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password.split('').sort(() => Math.random() - 0.5).join('');
}

function getPasswordStrength(password: string) {
  if (!password) return { text: '', color: 'bg-gray-200', width: 'w-0', score: 0 };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { text: 'Débil', color: 'bg-red-500', width: 'w-1/4', score };
  if (score <= 4) return { text: 'Media', color: 'bg-yellow-500', width: 'w-2/4', score };
  if (score === 5) return { text: 'Fuerte', color: 'bg-blue-500', width: 'w-3/4', score };
  return { text: 'Muy Fuerte', color: 'bg-emerald-500', width: 'w-full', score };
}

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    propertyType: 'Hogar',
    acceptsOffers: true
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useSuggestedPassword, setUseSuggestedPassword] = useState(false);
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const generateNewPassword = useCallback(() => {
    const pwd = generateStrongPassword();
    setSuggestedPassword(pwd);
    return pwd;
  }, []);

  const handleUseSuggested = () => {
    if (!useSuggestedPassword) {
      const pwd = generateNewPassword();
      setUseSuggestedPassword(true);
      setFormData(prev => ({ ...prev, password: pwd, confirmPassword: pwd }));
    } else {
      setUseSuggestedPassword(false);
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    }
  };

  const handleRefreshSuggested = () => {
    const pwd = generateNewPassword();
    setFormData(prev => ({ ...prev, password: pwd, confirmPassword: pwd }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: capitalizeName(e.target.value) });
  };

  const pwdStrength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          propertyType: formData.propertyType,
          acceptsOffers: formData.acceptsOffers
        })
      });

      if (res.ok) {
        const params = new URLSearchParams(window.location.search);
        const redirectPath = params.get('redirect');
        router.push(redirectPath || '/dashboard');
      } else {
        const data = await res.json();
        if (Array.isArray(data.error)) {
          setError(data.error[0].message);
        } else {
          setError(data.error || 'Error al registrarse');
        }
      }
    } catch {
      setError('Error de red. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-xl w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative z-10">
        <div className="text-center mb-10">
          <Image src="/img/logo.svg" alt="FUMIGUARD" width={64} height={64} className="mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="font-bold text-emerald-600 hover:text-emerald-500 transition-colors">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && <div className="bg-red-50 text-red-500 p-4 rounded-2xl text-sm text-center font-medium border border-red-100">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="Juan Pérez"
                value={formData.name}
                onChange={handleNameChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono (Opcional)</label>
              <input
                type="tel"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="+57 300 000 0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Propiedad</label>
              <select
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer appearance-none"
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              >
                <option value="Hogar">Hogar / Residencial</option>
                <option value="Negocio">Negocio / Empresa (Certificado INVIMA)</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUseSuggested}
                className={`flex-1 py-3 px-4 rounded-2xl text-sm font-bold transition-all ${
                  useSuggestedPassword
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-500'
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50'
                }`}
              >
                {useSuggestedPassword ? 'Usar mi propia contraseña' : 'Generar clave segura'}
              </button>
            </div>

            {useSuggestedPassword && suggestedPassword && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 font-mono text-lg font-bold text-emerald-800 tracking-wider select-all">
                    {showPassword ? suggestedPassword : '••••••••••••••••'}
                  </div>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 rounded-xl hover:bg-emerald-100 transition-colors"
                      title={showPassword ? 'Ocultar' : 'Mostrar'}
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleRefreshSuggested}
                      className="p-2 rounded-xl hover:bg-emerald-100 transition-colors"
                      title="Generar nueva contraseña"
                    >
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={() => { navigator.clipboard.writeText(suggestedPassword); }}
                      className="p-2 rounded-xl hover:bg-emerald-100 transition-colors"
                      title="Copiar"
                    >
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-2">Clave segura generada automáticamente. Puedes usarla o generar una nueva.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-500">Fortaleza: {pwdStrength.text}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${pwdStrength.color} ${pwdStrength.width}`}></div>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar Contraseña</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    className={`w-full bg-gray-50 border rounded-2xl px-5 py-4 text-gray-900 focus:ring-2 outline-none transition-all pr-12 ${
                      formData.confirmPassword
                        ? passwordsMatch
                          ? 'border-emerald-500 focus:ring-emerald-500'
                          : 'border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:ring-emerald-500'
                    }`}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {formData.confirmPassword && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      {passwordsMatch ? (
                        <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-4">
            <input
              type="checkbox"
              id="offers"
              className="mt-1 w-5 h-5 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2 cursor-pointer"
              checked={formData.acceptsOffers}
              onChange={(e) => setFormData({ ...formData, acceptsOffers: e.target.checked })}
            />
            <label htmlFor="offers" className="text-sm text-gray-600 cursor-pointer select-none">
              Quiero recibir promociones exclusivas, descuentos por fidelidad y recordatorios preventivos para mantener mi espacio libre de plagas.
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full !py-4 text-lg disabled:opacity-50"
            >
              {loading ? 'Procesando...' : 'Crear Cuenta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
