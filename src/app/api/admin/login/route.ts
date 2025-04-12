import { login } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const success = await login(body.password);

  if (success) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, message: 'Invalid password' },
    { status: 401 }
  );
} 