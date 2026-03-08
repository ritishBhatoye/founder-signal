/**
 * Hook for managing user profile data
 */

import { useState, useEffect, useCallback } from 'react'

import type { UserProfile } from './types'

// TODO: Import from Supabase client when installed
// import { supabase } from '@/lib/supabase';

interface UpdateProfileData {
  full_name?: string
  avatar_url?: string
}

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userId) {
      fetchProfile(userId)
    } else {
      setIsLoading(false)
    }
  }, [userId])

  const fetchProfile = async (id: string) => {
    try {
      setIsLoading(true)
      setError(null)

      // TODO: Replace with actual Supabase query
      // const { data, error } = await supabase
      //   .from('users')
      //   .select('*')
      //   .eq('id', id)
      //   .single();

      // Mock implementation
      const data = null
      const error = null

      if (error) {
        setError(error.message)
        setProfile(null)
      } else {
        setProfile(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile')
      setProfile(null)
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = useCallback(
    async (updates: UpdateProfileData): Promise<{ success: boolean; error?: string }> => {
      if (!userId) {
        return { success: false, error: 'No user ID provided' }
      }

      try {
        setIsUpdating(true)
        setError(null)

        // TODO: Replace with actual Supabase update
        // const { data, error } = await supabase
        //   .from('users')
        //   .update({
        //     ...updates,
        //     updated_at: new Date().toISOString(),
        //   })
        //   .eq('id', userId)
        //   .select()
        //   .single();

        // Mock implementation
        const data = null
        const error = null

        if (error) {
          setError(error.message)
          return { success: false, error: error.message }
        }

        setProfile(data)
        return { success: true }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to update profile'
        setError(errorMessage)
        return { success: false, error: errorMessage }
      } finally {
        setIsUpdating(false)
      }
    },
    [userId],
  )

  const refreshProfile = useCallback(() => {
    if (userId) {
      fetchProfile(userId)
    }
  }, [userId])

  return {
    profile,
    isLoading,
    isUpdating,
    error,
    updateProfile,
    refreshProfile,
  }
}
