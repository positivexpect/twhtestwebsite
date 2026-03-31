import { NextResponse } from 'next/server';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    email: string;
    name: string;
    role: string;
  };
}

// Generate a simple token (for temporary hardcoded auth)
function generateToken(email: string): string {
  return Buffer.from(
    JSON.stringify({
      email,
      name: 'Operations Admin',
      role: 'hq_admin',
      location_ids: ['1', '2', '3'],
      issuedAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    })
  ).toString('base64');
}

export async function POST(request: Request): Promise<NextResponse<LoginResponse>> {
  try {
    const body: LoginRequest = await request.json();
    const { email, password } = body;

    // Validate credentials against environment variables
    const validUsername = process.env.OPS_PORTAL_USERNAME;
    const validPassword = process.env.OPS_PORTAL_PASSWORD;

    if (!validUsername || !validPassword) {
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Check credentials
    if (email !== validUsername || password !== validPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate token
    const token = generateToken(email);

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        email,
        name: 'Operations Admin',
        role: 'hq_admin',
      },
    });

    // Set auth token in cookie
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400, // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 400 }
    );
  }
}
