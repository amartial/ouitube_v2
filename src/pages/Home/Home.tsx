/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 11:03:13
*/
import React, { FC, useEffect, Fragment, useState } from 'react';
import './Home.css';
import Loading from '../../components/Loading/Loading';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { Video } from '../../models/Video';
import VideoCard from '../../components/VideoCard/VideoCard';
import { useLocation } from 'react-router-dom';
import SearchBox from '../../components/SearchBox/SearchBox';


interface HomeProps {

}


const Home: FC<HomeProps> = () => {


  // const [state, setState] = useState<any>(null)
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<Video[]>([])
 



 
  useEffect(() => {
    window.scrollTo(0, 0)
    setLoading(false)
  }, [])

  return (
    <Fragment>
      {
        loading ?
          <Loading />
          :
          <div className="Home container-fluid py-2">
            <SearchBox
            handleChange={setVideos}
            />
            <div className="row">
              {
                videos.map((video: Video) => (<VideoCard key={video._id} video={video} />))
              }

            </div>
          </div>
      }
    </Fragment>
  );
}

export default Home;