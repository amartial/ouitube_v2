/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/08/2024 12:48:27
*/
import React, { FC, useEffect, useState } from 'react';
import './Container.css';
import VideoFormModal from '../VideoFormModal/VideoFormModal';
import { Video } from '../../models/Video';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';


interface ContainerProps {

}


const Container : FC<ContainerProps> = () =>{

  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [videos, setVieos] = useState<Video[]>([])

  const runLocalData = async () => {
    const data: any = await getAllVideo()
    if (data.isSuccess) {
      data.results.map((video: Video)=>{
        video.poster = convertBlobToUrl(video.poster as Blob)
        video.link = convertBlobToUrl(video.link as Blob)
        return video
      })
    }
    setVieos(data.results)
    // console.log(data)
  }

  useEffect(() => {
    window.scrollTo(0,0)
    runLocalData()
  }, [])

  return (
      <div className="container py-2">
          <button className="btn btn-primary" onClick={()=>setDisplayModal(true)}>
            Add Vidéo
          </button>
          {displayModal && <VideoFormModal
          hideModal={()=>setDisplayModal(false)}
          updateData={runLocalData }
          />}

          {
            videos.length !== 0 &&
            <div className="video-list py-1">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Poster</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    videos.map((video)=>{
                      return <tr key={video._id}>
                        <th scope="row">{video._id}</th>
                        <td>{video.title}</td>
                        <td><img width={80} src={video.poster as string} alt={video.title} /></td>
                        <td>{video.category }</td>
                        <td>
                          <button className="btn btn-success m-1">View</button>
                          <button className="btn btn-primary m-1">Edit</button>
                          <button className="btn btn-danger m-1">Delete</button>
                        </td>
                      </tr>
                    })
                  }

                </tbody>
              </table>
            </div>
          }
      </div>
  );
}

export default Container;
