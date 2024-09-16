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
    <div className="PlayListItem  p-1">
      <Link to={"/reader/" + video.slug} className={currentVideoId == video._id ? "row border current" : 'row border'}>
        <div className="col-md-4">
          <img
            className='p-1'
            width={"100%"}
            src={video.posterLink as string}
            alt={video.title} />
        </div>
        <div className="col-md-8">
          <div className="d-flex align-items-center">
            <strong>{video.title}</strong>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlayListItem;