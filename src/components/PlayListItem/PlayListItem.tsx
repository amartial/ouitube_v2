/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 12:05:05
*/
import React, { FC, useEffect } from 'react';
import './PlayListItem.css';
import { Video } from '../../models/Video';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';


interface PlayListItemProps {
  video: Video
  currentVideoId: number
}


const PlayListItem: FC<PlayListItemProps> = ({ currentVideoId, video }) => {

  const navigate = useNavigate()
  const createdAt = moment(video?.created_at)


  const handleClick = (event: any) => {
    event.preventDefault()

    const currentSearchParams = new URLSearchParams(window.location.search)


    navigate("/reader/" + video.slug + '?' + currentSearchParams.toString())

  }
  return (
    <div className={"PlayListItem  my-3 card shadow-lg" + (currentVideoId == video._id ? " current" : '')}>
      <a onClick={handleClick} href='#' className="row">
        <div className="col-4">
          <img
            className='p-1 rounded'
            width={"100%"}
            src={video.posterLink as string}
            alt={video.title} />
        </div>
        <div className="col-8 d-flex align-items-center">
          <div className="">
            <div className="video-title">
              <strong>{video.title}</strong>

            </div>
            <div className="created_at">
              Published at <strong>{createdAt.fromNow()}</strong>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default PlayListItem;