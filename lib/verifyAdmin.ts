import jwt from 'jsonwebtoken';

export interface JwtPayload {
  userId: string;
  role: 'CLIENT' | 'ADMIN';
}

export function verifyToken(token: string | undefined): JwtPayload | null {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function requireAdmin(token: string | undefined): JwtPayload | null {
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload || payload.role !== 'ADMIN') return null;
  return payload;
}
