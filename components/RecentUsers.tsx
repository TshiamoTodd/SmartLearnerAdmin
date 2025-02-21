import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from "@/components/ui/badge"
import { createClient } from '@/utils/supabase/server'

const RecentUsers = async () => {

    const supabase = await createClient()

    const {data: users, error} = await supabase.from('User').select('email, username, role').limit(5)
    

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-8'>
                {users!.map((item, index) => (
                    <div className='flex items-center gap-4' key={index}>
                        <Avatar className='hidden sm:flex size-9'>
                            <AvatarFallback>{item.username.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                            <p className='text-sm font-medium leading-none'>{item.username}</p>
                            <p className='text-sm text-muted-foreground'>{item.email}</p>
                        </div>
                        <div className='ml-auto font-medium'>
                        <Badge variant="outline" className='rounded-full bg-primary p-2 text-white font-light'>{item.role}</Badge>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default RecentUsers