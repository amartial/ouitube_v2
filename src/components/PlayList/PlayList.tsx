/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 12:03:13
*/
import React, { FC, useEffect, useState } from 'react';
import './PlayList.css';
import { Video } from '../../models/Video';
import { findVideo, getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import PlayListItem from '../PlayListItem/PlayListItem';
import { useLocation } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { ResultData } from '../../models/ResultData';


interface PlayListProps {
  videoId: number
}


const PlayList : FC<PlayListProps> = ({videoId}) =>{

  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const pageQuery = parseInt(currentSearchParams.get('page') || '1')
  const [currentPage, setCurrentPage] = useState<number>(pageQuery)
  const [pageSize, setPageSize] = useState<number>(20)
  const [videos, setVideos] = useState<Video[]>([])
  const [datas, setDatas] = useState<ResultData|null>(null)
  const location = useLocation()

  const runLocalData = async () => {
    const data: any = await findVideo(searchQuery,'title', currentPage, pageSize)
    setDatas(data)
    if (data.isSuccess) {
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
    },[location.search])

  return (
      <div className="PlayList p-1">
        <div className="PlayListHeader shadow-lg p-2">
          <h2>PlayList</h2>
          <p> {datas?.allCount} videos </p>
          <Pagination 
          pageLinks={datas?.pageLinks}
          currentPage={datas?.currentPage}
          totalPages={datas?.totalPages}
          nextPage={datas?.nextPage}
          previousPage={datas?.previousPage}
          onPageChange={setCurrentPage}
        />
        
        </div>
        <div className="PlayListContent">
          {
            videos.map((video: Video)=> <PlayListItem key={video._id} currentVideoId={videoId} video={video}/>)
          }

        </div>
      </div>
  );
}

export default PlayList;