/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 11:38:06
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './MediaReader.css';
import Loading from '../../components/Loading/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { searchVideoBySlug } from '../../api/api-video';
import { Video } from '../../models/Video';
import { OuitubePlayer } from 'ouitube-player';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import PlayList from '../../components/PlayList/PlayList';


interface MediaReaderProps {

}


const MediaReader: FC<MediaReaderProps> = () => {


  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [errorPage, setErrorpage] = useState(false);
  const [video, setVideo] = useState<Video | undefined>();
  let { slug } = useParams()
  const navigate = useNavigate()



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      if (slug) {
        try {
          const data: any = await searchVideoBySlug(slug)
          if (data.isSuccess) {
            const currentVideo = data.result
            currentVideo.posterLink = convertBlobToUrl(currentVideo.poster as Blob)
            currentVideo.videoLink = convertBlobToUrl(currentVideo.link as Blob)
            setVideo(currentVideo)
          } else {
            setErrorpage(true)
          }

        } catch (error) {
          setErrorpage(true)
        }
      }
      setLoading(false)
    }
    runLocalData()
  }, [slug])

  if (errorPage) {
    navigate('/error')
  }

  return (
    <div className='container-fluid'>
      {
        loading ?
          <Loading />
          :
          video ?
            <div className="MediaReader p-2">
              <div className="row">
                <div className="col-md-9">
                  <div className="shadow-lg">
                    <OuitubePlayer playing={true} src={video.videoLink as string} />
                    <div className="p-2">
                      <h2>
                        {video.title}
                      </h2>

                    </div>

                  </div>
                  <div className="shadow-lg">
                    <div className="video-description p-2">
                      <h3>Description : </h3>
                      {video.description}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 ">
                  <PlayList
                    videoId={video._id!}
                  />
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