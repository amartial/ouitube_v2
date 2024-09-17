/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 11:36:10
*/
import React, { FC, useEffect } from 'react';
import './VideoCard.css';
import { Video } from '../../models/Video';
import { Link } from 'react-router-dom';


interface VideoCardProps {
  video: Video
}


const VideoCard: FC<VideoCardProps> = ({ video }) => {



  return (
    <div key={video._id} className="VideoCard col-lg-4 col-md-6 p-1 ">
      <Link to={"/reader/"+video.slug}>
        <div className="shadow-lg card">
          <img
            src={video.posterLink}
            className="card-img-top" alt={video.title}
            height={300}
          />
          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">Created At: {video?.created_at?.toDateString()}</p>
            {/* Vous pouvez ajouter d'autres informations de la vidéo ici */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default VideoCard;