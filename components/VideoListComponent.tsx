import React from 'react'
import { string } from 'zod'
import { Card, CardContent } from './ui/card'

interface videoDataProps {
    title: string
    video_url: string
    description: string
}

const VideoListComponent = ({title, video_url, description}: videoDataProps) => {
  return (
    <Card className='p-5 mb-2'>
        <CardContent>
            <div className='flex flex-row items-center justify-between'>
                <div>
                    <h3 className='text-lg font-bold'>{title}</h3>
                    <p className='text-xs text-muted-foreground'>{description}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default VideoListComponent