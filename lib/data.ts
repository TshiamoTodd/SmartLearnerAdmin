'use server'


import { createClient } from "@/utils/supabase/server"


export const fetchUsers = async () => {
  const supabase = await createClient()
  try {
    const {data, error} = await supabase.from('User').select('email, username, role')
    if (error) {
      throw error
    }
    
    return data as {email: string, username: string, role: string}[]
  } catch (error) {
    console.log('error', error)
    return []
  }
}

export const addSubject = async (subject: {subjectName: string, gradeRange: string, schoolLevel: string}) => {
  const supabase = await createClient()
  try {
    const {data, error} = await supabase.from('Subject').insert([
      {
        subject_name: subject.subjectName,
        grade_range: subject.gradeRange,
        school_level: subject.schoolLevel
      }
    ])
    if (error) {
      throw error
    }

    return {
      success: true,
      data
    }
    
  } catch (error: any) {
    console.log('error', error) 
    return {
      success: false,
      error: error.message
    }
  }
}
  