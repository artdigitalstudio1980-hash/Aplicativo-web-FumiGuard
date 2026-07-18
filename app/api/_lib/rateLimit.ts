// Rate limiter en memoria, compatible con Next.js Route Handlers (Edge y Node runtime).
// Usa un Map<key, {count, resetTime}> con auto-limpieza periódica.
//
// Importante: este estado es POR PROCESO. Funciona bien para un único proceso
// en Hostinger. Si en el futuro se escala horizontalmente, hay que migrar a
// Redis/Upstash para que el conteo sea compartido.

import { NextRequest, NextResponse } from 'next/server';

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitInfo>();

// Limpieza periódica para evitar memory leaks de IPs que nunca regresan.
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutos
const CLEANUP_KEY = '__fumiguard_rate_limit_cleanup__';

declare global {
  // eslint-disable-next-line no-var
  var __fumiguard_rate_limit_cleanup__: NodeJS.Timeout | undefined;
}

if (typeof globalThis[CLEANUP_KEY] === 'undefined' && typeof setInterval !== 'undefined') {
  globalThis[CLEANUP_KEY] = setInterval(() => {
    const now = Date.now();
    ipRequestMap.forEach((info, ip) => {
      if (now > info.resetTime) {
        ipRequestMap.delete(ip);
      }
    });
  }, CLEANUP_INTERVAL_MS);
  // Permitir que el proceso termine limpiamente en tests.
  if (typeof globalThis[CLEANUP_KEY].unref === 'function') {
    globalThis[CLEANUP_KEY].unref();
  }
}

export interface RateLimiterOptions {
  windowMs: number;
  max: number;
  message?: string;
}

function getClientIp(req: NextRequest): string {
  // NextRequest expone la IP directamente si el runtime la resuelve.
  // En producción detrás de un proxy (Hostinger), x-forwarded-for es la fuente.
  const xff = req.headers.get('x-forwarded-for');
  if (xff) {
    // Tomar la primera IP de la lista (cliente original).
    return xff.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}

/**
 * Envuelve un handler de Next.js aplicando rate limit por IP.
 * Devuelve 429 cuando se supera el límite, con headers estándar.
 */
export function withRateLimit<T extends unknown[]>(
  handler: (req: NextRequest, ...rest: T) => Promise<NextResponse> | NextResponse,
  options: RateLimiterOptions
) {
  return async (req: NextRequest, ...rest: T): Promise<NextResponse> => {
    const ip = getClientIp(req);
    const now = Date.now();

    let info = ipRequestMap.get(ip);
    if (!info || now > info.resetTime) {
      info = { count: 0, resetTime: now + options.windowMs };
      ipRequestMap.set(ip, info);
    }
    info.count += 1;

    const remaining = Math.max(0, options.max - info.count);

    if (info.count > options.max) {
      const res = NextResponse.json(
        {
          error:
            options.message ||
            'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
          retryAfter: Math.ceil((info.resetTime - now) / 1000),
        },
        { status: 429 }
      );
      res.headers.set('X-RateLimit-Limit', String(options.max));
      res.headers.set('X-RateLimit-Remaining', '0');
      res.headers.set(
        'X-RateLimit-Reset',
        String(Math.ceil(info.resetTime / 1000))
      );
      res.headers.set(
        'Retry-After',
        String(Math.ceil((info.resetTime - now) / 1000))
      );
      return res;
    }

    const res = await handler(req, ...rest);
    res.headers.set('X-RateLimit-Limit', String(options.max));
    res.headers.set('X-RateLimit-Remaining', String(remaining));
    res.headers.set(
      'X-RateLimit-Reset',
      String(Math.ceil(info.resetTime / 1000))
    );
    return res;
  };
}

// Limiters preconfigurados, equivalentes a los del backend Express.
export const apiLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Límite de solicitudes superado. Por favor, intente en 15 minutos.',
};

export const authLimiter = {
  windowMs: 15 * 60 * 1000,
  max: 15,
  message:
    'Demasiados intentos de autenticación. Por favor, intente de nuevo en 15 minutos.',
};
