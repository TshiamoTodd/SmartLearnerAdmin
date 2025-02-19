import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from "@/components/ui/badge"


const data = [
    {
        id: 1,
        clientName: 'John Doe',
        clientEmail: 'johndoe@mail.com',
        total: 1000,
        currency: 'USD'
    },
    {
        id: 2,
        clientName: 'Jane Doe',
        clientEmail: 'janeDoe@mail.com',
        total: 2000,
        currency: 'USD'
    },
]

const RecentUsers = () => {
  return (
    <Card className='w-full'>
        <CardHeader>
            <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-8'>
            {data.map((item) => (
                <div className='flex items-center gap-4' key={item.id}>
                    <Avatar className='hidden sm:flex size-9'>
                        <AvatarFallback>{item.clientName.slice(0,2)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <p className='text-sm font-medium leading-none'>{item.clientName}</p>
                        <p className='text-sm text-muted-foreground'>{item.clientEmail}</p>
                    </div>
                    <div className='ml-auto font-medium'>
                    <Badge variant="outline" className='rounded-full bg-primary p-2'>Student</Badge>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
  )
}

export default RecentUsers