/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/09/2024 11:33:17
*/
import React, { FC, useEffect } from 'react';
import './DeleteVideoModal.css';
import { Button, Modal } from 'react-bootstrap';
import { deleteVideo } from '../../api/api-video';


interface DeleteVideoModalProps {
  hideModal: () => void
  updateData(): () => void
  videoId: number
}


const DeleteVideoModal : FC<DeleteVideoModalProps> = ({ videoId, updateData, hideModal }) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

    const handleDelete = async () => {
      await deleteVideo(videoId)
      updateData()
      hideModal()
    }

  return (
      <div className="DeleteVideoModal">
          <Modal show={true} size='lg' scrollable>
            <Modal.Header>
              <Modal.Title><h2>Delete Confirm</h2></Modal.Title>
              <button onClick={hideModal} className='btn-close'> </button>
            </Modal.Header>

            <Modal.Body>
              <p>Are you sure you want to delete this video ?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant='primary' onClick={hideModal}>Cancel </Button>
              <Button variant='success' onClick={handleDelete}>Confirm </Button>
            </Modal.Footer>
          </Modal>
      </div>
  );
}

export default DeleteVideoModal;
