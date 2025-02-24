import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import VideoPlayerComponent from '@/components/VideoPlayerComponent'
import { extractYouTubeVideoId } from '@/utils'
import { createClient } from '@/utils/supabase/server'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


type Params = Promise<{videoId: string}>

const PreviewVideoPage = async ({params}: {params: Params}) => {
  const {videoId} = await params
  const supabase = await createClient()

  const {data: video, error} = await supabase.from('SubjectVideos')
    .select('video_id, title, video_url, description')
    .eq('video_id', videoId)
    .single()

  video as {title: string, video_url: string, description: string}

  return (
    <>
    <Card className='w-full p-5 mb-2'>
        <CardDescription className='flex flex-row items-center justify-between'>
          <div>
            <h2 className='text-2xl font-semibold'>
              {video?.title}
            </h2>
            <p className='text-[12px] font-thin'>
              {video?.description}
            </p>
          </div>
        </CardDescription>
      </Card>
    <Card className='flex items-center justify-center w-full p-5 mb-2'>

      <VideoPlayerComponent video_url={video?.video_url} />

    </Card>
    </>
  )
}

export default PreviewVideoPage