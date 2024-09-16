/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/09/2024 20:21:51
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './MediaReader.css';
import Loading from '../../components/Loading/Loading';
import { useParams } from 'react-router-dom';
import { getVideo } from '../../api/api-video';
import { Video } from '../../models/Video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { OuitubePlayer } from 'ouitube-player';


interface MediaReaderProps {

}


const MediaReader : FC<MediaReaderProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    const [video, setVideo] = useState<Video|undefined>();
    const {videoId} = useParams()

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {
        if (videoId) {
          let id = parseInt(videoId)
          const data: any = await getVideo(id)
          if (data.isSuccess) {
            const currentVideo = data.result
            currentVideo.posterLink = convertBlobToUrl(currentVideo.poster as Blob)
            currentVideo.videoLink = convertBlobToUrl(currentVideo.video as Blob)
            setVideo(currentVideo)
          }
        }
        setLoading(false)
      }
      runLocalData()
    },[])

  return (
    <div className='container-fluid'>
    {
      loading ?
      <Loading />
      :
      video ?
      <div className="MediaReader ">
          <div className="row">
            <div className="col-md-8">
                <OuitubePlayer src={video.videoLink as string} />
                <h2>{video.title}</h2>
            </div>
          </div>
      </div>
      :
      null
    }
    </div>
  );
}

export default MediaReader;
