import EditVideo from '@/components/EditVideo'
import { createClient } from '@/utils/supabase/server'
import React from 'react'

type Params = Promise<{videoId: string}>

const page = async ({params}: {params: Params}) => {
  const {videoId} = await params
  const supabase = await createClient()
   
  const {data: video, error} = await supabase.from('SubjectVideos')
  .select('video_id, subject_id, title, description, video_url')
  .eq('video_id', videoId)
  .single()

  video as {video_id: any, subject_id: any, title: string, description: string, video_url: string}
  
  return (
    <EditVideo
      videoId={video?.video_id}
      subjectId={video?.subject_id}
      title={video?.title}
      description={video?.description}
      videoUrl={video?.video_url}
    />
  )
}

export default page