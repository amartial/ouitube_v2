/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/03/2024 16:53:35
*/
import React, { FC, useEffect, useState } from 'react';
import './Container.css';
import VideoFormModal from '../VideoFormModal/VideoFormModal';
import { Video } from '../../models/Video';
import { getAllVideo } from '../../api/api-video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import ViewVideoModal from '../ViewVideoModal/ViewVideoModal';
import DeleteVideoModal from '../DeleteVideoModal/DeleteVideoModal';
import UploadModal from '../UploadModal/UploadModal';
import { Link, useLocation } from 'react-router-dom';
import SearchBox from '../SearchBox/SearchBox';


interface ContainerProps {

}


const Container: FC<ContainerProps> = () => {

  const [displayModal, setDisplayModal] = useState<boolean>(false)
  const [viewModal, setViewModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [uploadModal, setUploadModal] = useState<boolean>(false)
  const [currentVideo, setCurrentVideo] = useState<Video | undefined>()
  const [videos, setVideos] = useState<Video[]>([])
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const location = useLocation()


  const runLocalData = async () => {
    const data: any = await getAllVideo()
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
    window.scrollTo(0, 0)
  }, [])

  const handleView = (video: Video) => {
    setCurrentVideo(video)
    setViewModal(true)
  }
  const handleEdit = (video: Video) => {
    setCurrentVideo(video)
    setDisplayModal(true)
  }
  const handleAdd = () => {
    setCurrentVideo(undefined)
    setDisplayModal(true)
  }
  const handleUpload = () => {
    setCurrentVideo(undefined)
    setUploadModal(true)
  }
  const handleDelete = (video: Video) => {
    setCurrentVideo(video)
    setDeleteModal(true)
  }

  return (
    <div className="container py-2">
       <SearchBox
        handleChange={setVideos}
      />
      <div className="d-flex gap-2 justify-content-between">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Vidéo
        </button>
        <button className="btn btn-danger" onClick={handleUpload}>
          Add Many
        </button>

      </div>
      {displayModal &&
        <VideoFormModal
          hideModal={() => setDisplayModal(false)}
          currentVideo={currentVideo}
          updateData={runLocalData}
        />}
      {uploadModal &&
        <UploadModal
          hideModal={() => setUploadModal(false)}
          updateData={runLocalData}
        />}
      {viewModal && currentVideo &&
        <ViewVideoModal
          hideModal={() => setViewModal(false)}
          videoId={currentVideo._id!}
        />}
      {deleteModal && currentVideo &&
        <DeleteVideoModal
          hideModal={() => setDeleteModal(false)}
          currentVideo={currentVideo}
          updateData={runLocalData}
        />}

     

      {
        videos.length !== 0 &&
        <div className="video-list py-1">
          <table className="table table-bordered shadow-lg">
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
                videos.map((video) => {
                  return <tr key={video._id}>
                    <th scope="row">{video._id}</th>
                    <td>
                      <Link to={'/reader/' + video.slug}>
                        {video.title}
                      </Link>
                    </td>
                    <td>
                      <img
                        width={80}
                        src={video.posterLink as string}
                        alt={video.title} />
                    </td>
                    <td>{video.category}</td>
                    <td>
                      <button className="btn btn-success m-1" onClick={() => handleView(video)}>View</button>
                      <button className="btn btn-primary m-1" onClick={() => handleEdit(video)}>Edit</button>
                      <button className="btn btn-danger m-1" onClick={() => handleDelete(video)}>Delete</button>
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