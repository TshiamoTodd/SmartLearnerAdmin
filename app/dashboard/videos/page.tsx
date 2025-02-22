import { buttonVariants } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import VideoListComponent from '@/components/VideoListComponent'
import { createClient } from '@/utils/supabase/server'
import { CirclePlus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const VideosPage = async () => {
  const supabase = await createClient()
  const  {data: videos, error} = await supabase.from('SubjectVideos')
  .select('title, video_url, description').limit(3)
  
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
            href={'/dashboard/subjects/create'}
            className={buttonVariants()}
          >
            <CirclePlus className='size-4'/>
            Add Video
          </Link>
        </CardDescription>
      </Card>

      <Card className='w-full p-5'>
        <div className='grid grid-cols-2 gap-3'>
          <div>
            <h3 className='text-lg font-semibold'>
              Video List
            </h3>
            {videos?.map((video, index) => (
              <VideoListComponent
                  key={index}
                  title={video.title}
                  video_url={video.video_url}
                  description={video.description}
              />
            ))}
          </div>
          <div>
            <iframe
              width='560'
              height='315'
              src={`https://www.youtube.com/embed/yEZt_kvNMgw?autoplay=0&origin=http://example.com&controls=0&rel=1`}
              title='YouTube video player'
              />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default VideosPage