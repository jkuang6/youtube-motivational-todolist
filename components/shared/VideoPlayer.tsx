"use client"

import Button from "../ui/Button"
import { updateVideo } from "@/app/page"

const VideoPlayer = ({ currentVideo }: { currentVideo: string | undefined}) => {

  return (
    <div className="flex flex-col items-center justify-center">
      <iframe
        src={`https://www.youtube.com/embed/${currentVideo}`}
        width="800"
        height="400"
        allow="fullscreen"
      />
      <div className="mt-2">
        <Button text ="Next Video" onClick={updateVideo} />
      </div>
    </div>
  )
}

export default VideoPlayer