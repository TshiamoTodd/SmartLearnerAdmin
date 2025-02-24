import React from 'react'
import { string } from 'zod'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'

interface videoDataProps {
    title: string
    video_url: string
    description: string
}

const VideoListComponent = ({title, video_url, description}: videoDataProps) => {
  return (
    <Card className='p-5 mb-2 w-full h-full'>
        <CardContent>
            <div className='flex flex-col items-start justify-between gap-2'>
                <h3 className='text-lg font-bold'>{title}</h3>
                <div className=' w-fullflex flex-col gap-2 p-3 m-0'>
                    <div className='flex flex-col items-start gap-1'>
                        <Badge className='rounded-full'>DescriptionL</Badge>
                        <p className='text-xs text-muted-foreground'>{description}</p>
                    </div>
                    <div className='flex flex-col items-start gap-1'>
                        <Badge className='rounded-full'>Video URL</Badge>
                        <p className='text-xs text-muted-foreground'>{video_url}</p>
                    </div>
                </div>
            </div>
            
        </CardContent>
    </Card>
  )
}

export default VideoListComponent