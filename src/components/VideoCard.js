const VideoCard = ({ info }) => {
  if (!info) return null
  const { snippet, statistics } = info
  const { thumbnails, channelTitle, title } = snippet
  return (
    <div className="p-2 m-2 w-72 shadow-lg">
      <img className="rounded-lg " src={thumbnails.medium.url} />
      <ul>
        <li className="font- py-2">{title} </li>
        <li>{channelTitle} </li>
        <li>{statistics.viewCount} views </li>
      </ul>
    </div>
  )
}

export const VideoCardBorderRed = ({ info }) => {
  // this is high order component
  return (
    <div>
      <VideoCard info={info} />
      <p> Add </p>
    </div>
  )
}

export default VideoCard
