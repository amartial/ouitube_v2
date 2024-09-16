/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/09/2024 20:14:32
*/
import React, { FC, useEffect } from 'react';
import './VideoCard.css';
import { Video } from '../../models/Video';
import { Link } from 'react-router-dom';


interface VideoCardProps {
  video: Video
}


const VideoCard : FC<VideoCardProps> = ({video}) =>{



  return (
    <div key={video._id} className="VideoCard col-lg-3 col-md-6 p-1">
      <Link to={"/reader/"+video._id}>
        <div className="card">
          <img
            src={video.posterLink}
            alt={video.posterLink}
            className="card-imp-top"
            height={300} />
          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">Created At: {video?.created_at?.toDateString()}</p>
          </div>
        </div>
      </Link>
  </div>
  );
}

export default VideoCard;
