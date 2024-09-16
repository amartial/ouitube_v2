/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 07:38:52
*/
import React, { FC, useEffect, useState } from 'react';
import './ViewVideoModal.css';
import { Button, Modal } from 'react-bootstrap';
import { Video } from '../../models/Video';
import { getVideo } from '../../api/api-video';
import Loading from '../Loading/Loading';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { OuitubePlayer } from 'ouitube-player';


interface ViewVideoModalProps {
  videoId: number
  hideModal: () => void
}


const ViewVideoModal: FC<ViewVideoModalProps> = ({ videoId, hideModal }) => {

  const [video, setVideo] = useState<Video | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)


  const runLocalData = async () => {
    const data: any = await getVideo(videoId)
    if (data.isSuccess) {
      const currentVideo = data.result
      currentVideo.poster = convertBlobToUrl(currentVideo.poster as Blob)
      currentVideo.link = convertBlobToUrl(currentVideo.link as Blob)
      setVideo(currentVideo)
    } else {
      // gestion erreurs
    }
    setIsLoading(false)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
    runLocalData()
  }, [])

  return (
    <div className="ViewVideoModal">
      <Modal show={true} scrollable size='lg'>
        <Modal.Header>
          <Modal.Title>
            <h2>{video?.title}</h2>
          </Modal.Title>
          <button onClick={hideModal} className='btn-close'></button>

        </Modal.Header>
        <Modal.Body>
          {
            isLoading ?
              <Loading />
              :
              video ?
                <table className="table table-bordered">
                  <tbody>
                  <tr>
                    <th>Title</th>
                    <td>{video.title}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{video.description}</td>
                  </tr>
                  <tr>
                    <th>Category</th>
                    <td>{video.category}</td>
                  </tr>
                  <tr>
                    <th>Poster</th>
                    <td>
                      <img src={video.poster as string} width={"100%"} alt={video.title} className="img-fluid" />
                    </td>
                  </tr>
                  <tr>
                    <th>Video</th>
                    <td>
                      <div className="video">
                      <OuitubePlayer src={video.link as string} />
                      {/* <video controls src={video.link as string} width={'100%'}></video> */}
                      </div>
                    </td>
                  </tr>

                  </tbody>
                </table>
                :
                <p>Error</p>
          }

        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewVideoModal;