import { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constant'
import VideoCard, { VideoCardBorderRed } from './VideoCard'
import { Link } from 'react-router-dom'

const VideoContainer = () => {
  const [videos, setVideos] = useState([])
  useEffect(() => {
    getVideos()
  }, [])

  const getVideos = async () => {
    const data = await fetch(YOUTUBE_VIDEOS_API)
    const json = await data.json()
    setVideos(json.items)
  }

  if (!videos) return null

  return (
    <div className="flex flex-wrap">
      <VideoCardBorderRed info={videos[0]} />
      {videos.map((video) => (
        <Link to={'/watch?v=' + video.id}>
          <VideoCard id={video.id} info={video} />
        </Link>
      ))}
    </div>
  )
}

export default VideoContainer
