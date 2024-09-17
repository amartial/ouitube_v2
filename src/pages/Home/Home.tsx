/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 11:03:13
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
import './Home.css';
import Loading from '../../components/Loading/Loading';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { Video } from '../../models/Video';
import VideoCard from '../../components/VideoCard/VideoCard';


interface HomeProps {
 
}


const Home : FC<HomeProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<Video[]>([])

    const runLocalData = async () => {
      const data: any = await getAllVideo()
      if (data.isSuccess) {
        data.results.map((video: Video) => {
          video.posterLink = convertBlobToUrl(video.poster as Blob)
          video.videoLink = convertBlobToUrl(video.link as Blob)
          return video
        })
        setVideos(data.results)
        setLoading(false)
      }
  
    }
    useEffect(() => {
      window.scrollTo(0,0)
     
      runLocalData()
    },[])

  return (
    <Fragment>
    {
      loading ?
      <Loading />
      :
      <div className="Home container-fluid py-2">
          <div className="row">
            {
              videos.map((video: Video)=>(
                <VideoCard video={video} />
              ))
            }
            
          </div>
      </div>
    }
    </Fragment>
  );
}

export default Home;