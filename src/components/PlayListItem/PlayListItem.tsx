/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 12:05:05
*/
import React, { FC, useEffect } from 'react';
import './PlayListItem.css';
import { Video } from '../../models/Video';
import { Link } from 'react-router-dom';


interface PlayListItemProps {
  video: Video
  currentVideoId: number
}


const PlayListItem: FC<PlayListItemProps> = ({ currentVideoId, video }) => {

  return (
    <div className={"PlayListItem  my-3 card shadow-lg"+(currentVideoId == video._id ? " current" : '')}>
      <Link to={"/reader/" + video.slug} className="row">
        <div className="col-4">
          <img
            className='p-1 rounded'
            width={"100%"}
            src={video.posterLink as string}
            alt={video.title} />
        </div>
        <div className="col-8 d-flex align-items-center">
          <div className="">
            <strong>{video.title}</strong>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlayListItem;