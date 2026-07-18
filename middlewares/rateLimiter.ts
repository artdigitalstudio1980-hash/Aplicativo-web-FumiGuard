import { Request, Response, NextFunction } from 'express';

interface RateLimitInfo {
  count: number;
  resetTime: number;
}

const ipRequestMap = new Map<string, RateLimitInfo>();

// Limpiar periódicamente el mapa en memoria para evitar memory leaks
setInterval(() => {
  const now = Date.now();
  ipRequestMap.forEach((info, ip) => {
    if (now > info.resetTime) {
      ipRequestMap.delete(ip);
    }
  });
}, 5 * 60 * 1000); // Cada 5 minutos


interface RateLimiterOptions {
  windowMs: number; // Ventana de tiempo en milisegundos
  max: number;      // Número máximo de peticiones por ventana
  message?: string; // Mensaje de error personalizado
}

export const createRateLimiter = (options: RateLimiterOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
    const now = Date.now();

    let rateLimitInfo = ipRequestMap.get(ip);

    if (!rateLimitInfo || now > rateLimitInfo.resetTime) {
      rateLimitInfo = {
        count: 0,
        resetTime: now + options.windowMs,
      };
      ipRequestMap.set(ip, rateLimitInfo);
    }

    rateLimitInfo.count++;

    const remaining = Math.max(0, options.max - rateLimitInfo.count);
    
    // Set standards headers
    res.setHeader('X-RateLimit-Limit', options.max);
    res.setHeader('X-RateLimit-Remaining', remaining);
    res.setHeader('X-RateLimit-Reset', Math.ceil(rateLimitInfo.resetTime / 1000));

    if (rateLimitInfo.count > options.max) {
      return res.status(429).json({
        error: options.message || 'Demasiadas solicitudes. Por favor, inténtelo de nuevo más tarde.',
        retryAfter: Math.ceil((rateLimitInfo.resetTime - now) / 1000)
      });
    }

    next();
  };
};

// Limites predefinidos
export const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 solicitudes por IP
  message: 'Límite de solicitudes superado para la API general. Por favor, intente en 15 minutos.'
});

export const authLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 15, // Máximo 15 intentos de login/registro/recuperación
  message: 'Demasiados intentos de autenticación. Por favor, intente de nuevo en 15 minutos.'
});
