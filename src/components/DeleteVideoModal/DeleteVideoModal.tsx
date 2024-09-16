/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 09:14:11
*/
import React, { FC, useEffect } from 'react';
import './DeleteVideoModal.css';
import { Button, Modal } from 'react-bootstrap';
import { deleteVideo } from '../../api/api-video';
import { Video } from '../../models/Video';


interface DeleteVideoModalProps {
  hideModal: () => void
  updateData: () => void
  currentVideo: Video
}


const DeleteVideoModal: FC<DeleteVideoModalProps> = ({ currentVideo, updateData, hideModal }) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleDelete = async () => {
    await deleteVideo(currentVideo._id!)
    updateData()
    hideModal()
  }

  return (
    <div className="DeleteVideoModal">
      <Modal show={true} scrollable centered>
        <Modal.Header>
          <Modal.Title>
            <h2>Delete Confirm</h2>
          </Modal.Title>
          <button onClick={hideModal} className='btn-close'></button>

        </Modal.Header>

        <Modal.Body>
          <p>Are you sure you want to delete this video :
            <strong>{currentVideo.title}</strong>?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={hideModal}>Cancel</Button>
          <Button variant='success' onClick={handleDelete}>Comfirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DeleteVideoModal;