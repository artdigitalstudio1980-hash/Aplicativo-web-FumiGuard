import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied, token missing!' });

  if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined in environment variables.');
    return res.status(500).json({ error: 'Internal server configuration error' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token is not valid' });
    req.user = user;
    next();
  });
};
