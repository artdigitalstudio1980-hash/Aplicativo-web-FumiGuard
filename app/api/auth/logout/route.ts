import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit, apiLimiter } from '../../_lib/rateLimit';

async function logoutHandler(_req: NextRequest) {
  const response = NextResponse.json({ message: 'Logged out successfully' });

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  });

  return response;
}

export const POST = withRateLimit(logoutHandler, apiLimiter);
