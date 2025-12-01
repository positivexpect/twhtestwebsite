import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

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

    // Generate JWT token
    const token = jwt.sign(
      {
        email,
        name: 'Operations Admin',
        role: 'hq_admin',
        location_ids: ['1', '2', '3'], // All locations
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const response = NextResponse.json({
      success: true,
      token,
      user: {
        email,
        name: 'Operations Admin',
        role: 'hq_admin',
      },
    });

    // Set auth token in httpOnly cookie
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
