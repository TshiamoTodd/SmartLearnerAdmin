import React from 'react'
import { Card, CardDescription } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { CirclePlus } from 'lucide-react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

type Subject = {
  id: string
  subjectName: number
  gradeRange: string
  schoolLevel: string
}

const SubjectsPage = async () => {
  const supabase = await createClient()
  const subjects: Subject[] = []

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

  const { data: subjectData, error } = await supabase.from('Subject').select('subject_id, subject_name, grade_range, school_level')

  if (subjectData) {
    subjectData.forEach((subject: any) => {
      subjects.push({
        id: subject.subject_id,
        subjectName: subject.subject_name,
        gradeRange: swapGradeRange(subject.grade_range),
        schoolLevel: subject.school_level === '1' ? 'Primary' : 'Secondary'
      })
    })
  }

  return (
    <div className='flex flex-col p-3 w-full'>
      <Card className='w-full p-5 mb-2'>
        <CardDescription className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold'>
              Subjects Table
            </h2>
            <p className='text-[12px] font-thin'>
              List of all subjects offered on the app
            </p>
          </div>

          <Link
            href={'/dashboard/subjects/create'}
            className={buttonVariants()}
          >
            <CirclePlus className='size-4'/>
            Add Subject
          </Link>
        </CardDescription>
      </Card>

      <Card className='w-full p-5'>
        {subjects ? <DataTable columns={columns} data={subjects} /> : <p>No subjects available</p>}
      </Card>

      
      
    </div>
  )
}

export default SubjectsPage