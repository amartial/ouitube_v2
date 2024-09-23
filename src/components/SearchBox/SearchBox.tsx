/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 06/03/2024 08:32:41
*/
import React, { FC, useEffect, useState } from 'react';
import './SearchBox.css';
import { useLocation } from 'react-router-dom';
import { findVideo, getAllVideo, getVideoByPage } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { Video } from '../../models/Video';
import Pagination from '../Pagination/Pagination';
import { ResultData } from '../../models/ResultData';


interface SearchBoxProps {
  handleChange: (videos: Video[]) => void
}



const SearchBox: FC<SearchBoxProps> = ({ handleChange }) => {

  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const pageQuery = parseInt(currentSearchParams.get('page') || '1')
  const [datas, setDatas] = useState<ResultData|null>(null)
  const [currentPage, setCurrentPage] = useState<number>(pageQuery)
  const [pageSize, setPageSize] = useState<number>(8)
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
      handleChange(data.results)
    }

  }

  useEffect(() => {
    window.scrollTo(0, 0)

    runLocalData()
  }, [location.search, currentPage, pageSize])

  return (
    <div className="SearchBox">
      {
        searchQuery !== "" &&
        <div className="HomeHeader">
          <h2>Search Results</h2>
          <p>
            Displaying {datas?.allCount} videos matching the search query "<strong>{searchQuery}</strong>".
          </p>
        </div>
      }
      <div className="d-flex justify-content-between gap-2">
        <div>
        <Pagination 
          pageLinks={datas?.pageLinks}
          currentPage={datas?.currentPage}
          totalPages={datas?.totalPages}
          nextPage={datas?.nextPage}
          previousPage={datas?.previousPage}
          onPageChange={setCurrentPage}
        />
        <p>
            Page {datas?.currentPage}/{datas?.totalPages} .Total {datas?.allCount} videos.
          </p>

        </div>
        <div>
      <select name="pageSize" id="pageSize" className='form-control'
      onChange={(e)=>setPageSize(parseInt(e.target.value))}
      >
        <option value="8">8</option>
        <option value="16">16</option>
        <option value="32">32</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

        </div>

      </div>
    </div>
  );
}

export default SearchBox;