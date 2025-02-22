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

export const deleteSubject = async (id: string) => {
  const supabase = await createClient()
  try {
    const {data, error} = await supabase.from('Subject').delete().eq('subject_id', id)
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

export const updateSubject = async (subject: {subjectId: string, subjectName: string, gradeRange: string, schoolLevel: string}) => {
  const supabase = await createClient()
  try {
    const {data, error} = await supabase.from('Subject').update({
      subject_name: subject.subjectName,
      grade_range: subject.gradeRange,
      school_level: subject.schoolLevel
    }).eq('subject_id', subject.subjectId)
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
  