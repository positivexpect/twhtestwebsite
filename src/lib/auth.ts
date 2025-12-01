/**
 * Authentication utilities and functions
 * 
 * TODO: Integrate with Supabase Auth or preferred auth provider
 * Currently supports basic JWT token handling
 */

import { User } from '@/types/franchise';

/**
 * Store auth token in localStorage/cookies
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
    document.cookie = `authToken=${token}; path=/; max-age=86400`;
  }
}

/**
 * Get auth token from storage
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('authToken');
}

/**
 * Remove auth token
 */
export function clearAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    document.cookie = 'authToken=; path=/; max-age=0';
  }
}

/**
 * Login with email and password
 * TODO: Implement actual API call to backend
 */
export async function login(email: string, password: string): Promise<{ user: User; token: string }> {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    setAuthToken(data.token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Logout user
 * TODO: Implement actual API call to backend
 */
export async function logout(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    clearAuthToken();
  }
}

/**
 * Sign up with email and password
 * TODO: Implement actual API call to backend
 */
export async function signup(
  email: string,
  password: string,
  fullName: string
): Promise<{ user: User; token: string }> {
  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    const data = await response.json();
    setAuthToken(data.token);
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

/**
 * Get current user from token
 * TODO: Implement actual API call to backend
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      clearAuthToken();
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}

/**
 * Decode JWT token (client-side, for checking expiry)
 * WARNING: This is for client-side checks only. Always validate on server!
 */
export function decodeToken(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

/**
 * Check if user has access to a specific location
 */
export function canAccessLocation(user: User | null, locationId: string): boolean {
  if (!user) return false;
  if (user.role === 'hq_admin') return true; // HQ admins can access all locations
  return user.location_ids.includes(locationId);
}

/**
 * Check if user has a specific role
 */
export function hasRole(user: User | null, role: string): boolean {
  return user?.role === role;
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = decodeToken(token);
    if (!decoded.exp) return false;
    
    const expiryTime = decoded.exp * 1000; // Convert to milliseconds
    return Date.now() >= expiryTime;
  } catch {
    return true;
  }
}

/**
 * Refresh auth token
 * TODO: Implement actual API call to backend
 */
export async function refreshToken(): Promise<string | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      clearAuthToken();
      return null;
    }

    const data = await response.json();
    setAuthToken(data.token);
    return data.token;
  } catch (error) {
    console.error('Token refresh error:', error);
    clearAuthToken();
    return null;
  }
}
