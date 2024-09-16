/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 13:28:18
*/
import React, { FC, useEffect } from 'react';
import './UploadModal.css';
import { Modal } from 'react-bootstrap';


interface UploadModalProps {
  hideModal: ()=>void
  updateData: ()=>void
}


const UploadModal : FC<UploadModalProps> = ({hideModal, updateData}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="UploadModal">
         <Modal show={true} scrollable size='lg' centered>
        <Modal.Header>
          <Modal.Title>
            <h2>Upload Video</h2>
          </Modal.Title>
          <button onClick={hideModal} className='btn-close'></button>

        </Modal.Header>
        <Modal.Body>
            <div className="upload-zone">
              <p>Glissez dépossez vos fichiers vidéos !</p>
            </div>
        </Modal.Body>
      </Modal>
      </div>
  );
}

export default UploadModal;