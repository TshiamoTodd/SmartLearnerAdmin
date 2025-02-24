'use server'


import { createClient } from "@/utils/supabase/server"

const swapGradeRange = (gradeRange: string) => {
  switch (gradeRange) {
    case '1':
      return 'Grade 1 - 3'
    case '2':
      return 'Grade 4 - 6'
    case '3':
      return 'Grade 7 '
    case '4':
      return 'Grade 8 - 9'
    case '5':
      return 'Grade 10 - 12'
    default:
      return 'Grade 1 - 12'
  }
}

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

export const getSubjectsForVideoCreationForm = async () => {
  const formattedSubjects: { value: string; label: string }[] = [
  ]
  const supabase = await createClient()
  try {
    const {data, error} = await supabase.from('Subject').select('subject_id, subject_name, grade_range, school_level')
    if (error) {
      throw error
    }

    data.forEach((subject: {subject_id: string, subject_name: string, grade_range: string, school_level: string}) => {
      formattedSubjects.push({
        value: subject.subject_id,
        label: `${subject.subject_name} - ${swapGradeRange(subject.grade_range)} - ${subject.school_level === '1' ? 'Primary' : 'Secondary'}`
      })
    })
    
    return {
      success: true,
      data: formattedSubjects
    }

  } catch (error: any) {
    console.log('error', error)
    return {
      success: false,
      error: error.message
    }
  }
}

export const addSubjectVideo = async (video: {title: string, description: string, videoUrl: string, subjectId: any}) => {
  const supabase = await createClient()
  try {
    const {data: subjectId, error: subjectIdErr} = await supabase.from('Subject')
    .select('subject_id')
    .eq('subject_id', video.subjectId)
    .single()

    if (subjectIdErr) {
      return {
        success: false,
        error: subjectIdErr.message
      }
    }

    if (!subjectId) {
      return {
        success: false,
        error: 'Subject not found'
      }
    }

    const {data, error} = await supabase.from('SubjectVideos').insert([
      {
        title: video.title,
        description: video.description,
        video_url: video.videoUrl,
        subject_id: subjectId.subject_id
      }
    ])

    if (error) {
      console.log("Supabase.error: ",error)
      throw error
    }

    return {
      success: true,
      data
    }
    
  } catch (error: any) {
    console.log('Server Catch.error', error) 
    return {
      success: false,
      error: error.message
    }
  }
}
  