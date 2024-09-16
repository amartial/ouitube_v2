/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/09/2024 18:38:20
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


const ViewVideoModal : FC<ViewVideoModalProps> = ({videoId, hideModal}) =>{

  const [video, setVideo] = useState<Video|null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const runLocalData = async () => {
    const data: any = await getVideo(videoId)
    if (data.isSuccess){
      const currentVideo = data.result
      currentVideo.poster = convertBlobToUrl(currentVideo.poster as Blob)
      currentVideo.link = convertBlobToUrl(currentVideo.link as Blob)
      setVideo(data.result)
    } else {

    }
    setIsLoading(false)
  }
  useEffect(() => {
    window.scrollTo(0,0)
    runLocalData()
  })

  return (
      <div className="ViewVideoModal">
          <Modal show={true} size='lg' scrollable>
            <Modal.Header>
              <Modal.Title>View Video</Modal.Title>
              <Button onClick={hideModal} className='btn-close'> </Button>
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
                          <td><img src={video.poster as string} width={"100%"} alt={video.title} className="fluid" /></td>
                        </tr>
                        <tr>
                          <th>Video</th>
                          <td>
                            <div className="video">
                              <OuitubePlayer src={video.link as string} />
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
              <Button variant='primary'>Close </Button>
            </Modal.Footer>
          </Modal>
      </div>
  );
}

export default ViewVideoModal;
