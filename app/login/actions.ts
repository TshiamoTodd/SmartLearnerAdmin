'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

interface UserData {
    email: string
    password: string
}

export async function login(userData: UserData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: userData.email,
    password: userData.password,
  }

  const { data: signedInUser, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return {
        success: false,
        error: error.message
    }
  }

  if(signedInUser.user) {
    const { data: userRole, error: roleError } = await supabase
        .from('User')
        .select('role')
        .eq('id', signedInUser.user.id)
        .single()

    if (roleError || !userRole || userRole.role !== 'Admin') {
        return {
            success: false,
            error: 'Access denied. Only admins can log in.'
        }
    }
    
    revalidatePath('/login', 'layout')
    redirect('/dashboard')
  }

}

