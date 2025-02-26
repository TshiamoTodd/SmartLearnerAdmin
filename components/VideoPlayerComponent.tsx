'use client'
import React, { useEffect, useState } from 'react'
import { string } from 'zod'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { extractYouTubeVideoId } from '@/utils'

interface videoDataProps {
    video_url: string
}

const VideoPlayerComponent = ({video_url}: videoDataProps) => {
    const [width, setWidth] = useState("90vw");

    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth > 800 ? "600px" : "90vw");
        };

        updateWidth(); // Set initial width
        window.addEventListener("resize", updateWidth);

        return () => window.removeEventListener("resize", updateWidth);
    }, [])

    return (
        <div>
            <iframe 
                src={`https://www.youtube.com/embed/${extractYouTubeVideoId(video_url)}?autoplay=0&origin=http://example.com&controls=0&rel=1`} 
                style={{ width: width, height: "450px" }}
                allowFullScreen
            />
        </div>
    )
}

export default VideoPlayerComponent