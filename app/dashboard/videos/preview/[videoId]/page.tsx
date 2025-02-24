import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import VideoListComponent from '@/components/VideoListComponent'
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
    <Card className='flex flex-row items-center justify-between p-3 gap-2'>
      <VideoListComponent 
        title={video?.title}
        video_url={video?.video_url}
        description={video?.description}
      />

      <div>
        <iframe src={`https://www.youtube.com/embed/${extractYouTubeVideoId(video?.video_url)}?autoplay=0&origin=http://example.com&controls=0&rel=1`} width="560" height="315" allowFullScreen/>
      </div>

    </Card>
    </>
  )
}

export default PreviewVideoPage