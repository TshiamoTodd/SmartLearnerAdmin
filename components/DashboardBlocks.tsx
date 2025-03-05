import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Activity, BookCopy, Bot, CreditCard, File, User, Users } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

const DashboardBlocks = async () => {
    const supabase = await createClient()

    const { data: users, error } = await supabase.from('User').select('email, username, role').eq('role', 'Student')
    const userCount = users ? users.length : 0

    const { data: subjects } = await supabase.from('Subject').select('subject_name')
    const subjectCount = subjects ? subjects.length : 0

    const { data: pdfs, error: pdfError } = await supabase.storage.from('pdfBucket').list('')
    console.log(pdfs)
    console.log(pdfError)

    return (
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 md:gap-8'>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Users</CardTitle>
                    <User className='size-4 text-muted-foreground'/>
                </CardHeader>
                <CardContent>
                    <h2 className='text-2xl font-bold'>
                        {userCount}
                    </h2>
                    <p className='text-xs text-muted-foreground'>
                        Based on total users signed up
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Total Subjects Offered</CardTitle>
                    <BookCopy className='size-4 text-muted-foreground'/>
                </CardHeader>
                <CardContent>
                    <h2 className='text-2xl font-bold'>
                        {subjectCount}
                    </h2>
                    <p className='text-xs text-muted-foreground'>
                        Smart Learner Subjects Offered
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>AI interactions</CardTitle>
                    <Bot className='size-4 text-muted-foreground'/>
                </CardHeader>
                <CardContent>
                    <h2 className='text-2xl font-bold'>
                        +19056
                    </h2>
                    <p className='text-xs text-muted-foreground'>
                        Total prompts made to the AI!
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Past Question Papers</CardTitle>
                    <File className='size-4 text-muted-foreground'/>
                </CardHeader>
                <CardContent>
                    <h2 className='text-2xl font-bold'>
                        +43
                    </h2>
                    <p className='text-xs text-muted-foreground'>
                        Total Past questions papers offered
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardBlocks