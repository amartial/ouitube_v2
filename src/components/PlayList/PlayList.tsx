/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 12:03:13
*/
import React, { FC, useEffect, useState } from 'react';
import './PlayList.css';
import { Video } from '../../models/Video';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import PlayListItem from '../PlayListItem/PlayListItem';


interface PlayListProps {
  videoId: number
}


const PlayList : FC<PlayListProps> = ({videoId}) =>{

  const [videos, setVideos] = useState<Video[]>([])

  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      console.log(data.results);
      
      data.results.map((video: Video) => {
        video.posterLink = convertBlobToUrl(video.poster as Blob)
        video.videoLink = convertBlobToUrl(video.link as Blob)
        return video
      })
      setVideos(data.results)
    }

  }
    useEffect(() => {
      window.scrollTo(0,0)
      runLocalData()
    },[])

  return (
      <div className="PlayList">
          {
            videos.map((video: Video)=> <PlayListItem key={video._id} currentVideoId={videoId} video={video}/>)
          }
      </div>
  );
}

export default PlayList;