/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 06/03/2024 08:32:41
*/
import React, { FC, useEffect, useState } from 'react';
import './SearchBox.css';
import { useLocation } from 'react-router-dom';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { Video } from '../../models/Video';


interface SearchBoxProps {
  handleChange: (videos: Video[])=>void
}


const SearchBox : FC<SearchBoxProps> = ({handleChange}) =>{

  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const [videos, setVideos] = useState<Video[]>([])
  const location = useLocation()

  console.log({ searchQuery });

  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      data.results.map((video: Video) => {
        video.posterLink = convertBlobToUrl(video.poster as Blob)
        video.videoLink = convertBlobToUrl(video.link as Blob)
        return video
      })

      const filteredVideos = data.results.filter((video: Video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      handleChange(filteredVideos)
      setVideos(filteredVideos)
    }

  }

    useEffect(() => {
      window.scrollTo(0,0)
      
      runLocalData()
    },[location.search])

  return (
      <div className="SearchBox">
           {
          searchQuery !== "" &&
          <div className="HomeHeader">
            <h2>Search Results</h2>
            <p>
            Displaying {videos.length} videos matching the search query "<strong>{searchQuery}</strong>".
            </p>
          </div>
        }
      </div>
  );
}

export default SearchBox;