import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import VideoListComponent from '@/components/VideoPlayerComponent'
import { createClient } from '@/utils/supabase/server'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

type SubjectVideo = {
  id: string
  title: string
  description: number
  video_url: string
}

const VideosPage = async () => {
  const supabase = await createClient()
  const videos: SubjectVideo[] = []
  const  {data: videoData, error} = await supabase.from('SubjectVideos')
  .select('video_id, title, video_url, description')

  if (videoData) {
    videoData.forEach((video: any) => {
      videos.push({
        id: video.video_id,
        title: video.title,
        description: video.description,
        video_url: video.video_url,
      })
    })
  }
  
  return (
    <div className='flex flex-col p-3 w-full'>
      <Card className='w-full p-5 mb-2'>
        <CardDescription className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold'>
              Subject Videos
            </h2>
            <p className='text-[12px] font-thin'>
              List of all vides offered on the app
            </p>
          </div>

          <Link
            href={'/dashboard/videos/create'}
            className={buttonVariants()}
          >
            <CirclePlus className='size-4'/>
            Add Video
          </Link>
        </CardDescription>
      </Card>

      <Card className='w-full p-5'>
        {videos ? <DataTable columns={columns} data={videos} /> : <p>No subjects available</p>}
      </Card>
    </div>
  )
}

export default VideosPage