import EditSubject from '@/components/EditSubject'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

type Params = Promise<{subjectId: string}>

const EditSubjectPage = async ({params}: {params: Params}) => {
    const {subjectId} = await params
    const supabase = await createClient()

    const {data: subject, error} = await supabase.from('Subject')
    .select('subject_id, subject_name, grade_range, school_level')
    .eq('subject_id', subjectId)
    .single()
    
    subject as {subject_name: string, grade_range: string, school_level: string}

    return (
        <EditSubject 
            id={subject?.subject_id}
            gradeRange={subject?.grade_range}
            schoolLevel={subject?.school_level}
            subjectName={subject?.subject_name} 
        />
    )
}

export default EditSubjectPage