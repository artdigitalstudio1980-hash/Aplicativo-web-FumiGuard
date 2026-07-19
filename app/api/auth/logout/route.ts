import { NextResponse } from 'next/server';
import { withRateLimit, apiLimiter } from '../../_lib/rateLimit';

async function logoutHandler() {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}

export const POST = withRateLimit(logoutHandler, apiLimiter);
