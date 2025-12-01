/**
 * Custom React hooks for the franchise operations portal
 * 
 * These hooks handle:
 * - Data fetching with proper location scoping
 * - Error handling
 * - Loading states
 * - Access control checks
 */

import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { canAccessLocation } from '@/lib/auth';
import { Lead, Job, Conversation, Location } from '@/types/franchise';

interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook to fetch data with location access control
 */
function useFetch<T>(url: string, locationId?: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      // Check access control if location is specified
      if (locationId && user && !canAccessLocation(user, locationId)) {
        setError(new Error('Access denied'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, locationId, user]);

  return { data, isLoading, error };
}

/**
 * Hook to fetch leads for a location
 */
export function useLeads(locationId: string) {
  return useFetch<Lead[]>(`/api/locations/${locationId}/leads`, locationId);
}

/**
 * Hook to fetch a single lead
 */
export function useLead(locationId: string, leadId: string) {
  return useFetch<Lead>(`/api/locations/${locationId}/leads/${leadId}`, locationId);
}

/**
 * Hook to fetch jobs for a location
 */
export function useJobs(locationId: string) {
  return useFetch<Job[]>(`/api/locations/${locationId}/jobs`, locationId);
}

/**
 * Hook to fetch a single job
 */
export function useJob(locationId: string, jobId: string) {
  return useFetch<Job>(`/api/locations/${locationId}/jobs/${jobId}`, locationId);
}

/**
 * Hook to fetch conversations for a location
 */
export function useConversations(locationId: string) {
  return useFetch<Conversation[]>(`/api/locations/${locationId}/conversations`, locationId);
}

/**
 * Hook to fetch a single conversation
 */
export function useConversation(locationId: string, conversationId: string) {
  return useFetch<Conversation>(`/api/locations/${locationId}/conversations/${conversationId}`, locationId);
}

/**
 * Hook to fetch all locations (HQ only)
 */
export function useLocations() {
  const { user } = useAuth();
  const [data, setData] = useState<Location[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!user || user.role !== 'hq_admin') {
        setError(new Error('Only HQ admins can access all locations'));
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/locations', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, [user]);

  return { data, isLoading, error };
}

/**
 * Hook for handling mutations (POST, PATCH, DELETE)
 */
export function useMutation<T>(
  method: 'POST' | 'PATCH' | 'DELETE',
  url: string,
  locationId?: string
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const mutate = useCallback(
    async (payload?: any): Promise<T | null> => {
      // Check access control if location is specified
      if (locationId && user && !canAccessLocation(user, locationId)) {
        const accessError = new Error('Access denied');
        setError(accessError);
        throw accessError;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        return result;
      } catch (err) {
        const mutateError = err instanceof Error ? err : new Error('Unknown error');
        setError(mutateError);
        throw mutateError;
      } finally {
        setIsLoading(false);
      }
    },
    [url, locationId, user]
  );

  return { mutate, isLoading, error };
}

/**
 * Hook to create a new lead
 */
export function useCreateLead(locationId: string) {
  return useMutation('POST', `/api/locations/${locationId}/leads`, locationId);
}

/**
 * Hook to update a lead
 */
export function useUpdateLead(locationId: string, leadId: string) {
  return useMutation('PATCH', `/api/locations/${locationId}/leads/${leadId}`, locationId);
}

/**
 * Hook to delete a lead
 */
export function useDeleteLead(locationId: string, leadId: string) {
  return useMutation('DELETE', `/api/locations/${locationId}/leads/${leadId}`, locationId);
}

/**
 * Hook to create a new job
 */
export function useCreateJob(locationId: string) {
  return useMutation('POST', `/api/locations/${locationId}/jobs`, locationId);
}

/**
 * Hook to update a job
 */
export function useUpdateJob(locationId: string, jobId: string) {
  return useMutation('PATCH', `/api/locations/${locationId}/jobs/${jobId}`, locationId);
}

/**
 * Hook to delete a job
 */
export function useDeleteJob(locationId: string, jobId: string) {
  return useMutation('DELETE', `/api/locations/${locationId}/jobs/${jobId}`, locationId);
}
