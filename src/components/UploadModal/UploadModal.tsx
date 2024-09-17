/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 13:28:18
*/
import React, { FC, useEffect, useState } from 'react';
import './UploadModal.css';
import { Modal } from 'react-bootstrap';
import FileDrop from '../FileDrop/FileDrop';
import { convertFileToBlob, linkToBlob } from '../../helpers/filehelpers';
import { Video } from '../../models/Video';
import Loading from '../Loading/Loading';
import { addVideo } from '../../api/api-video';


interface UploadModalProps {
  hideModal: () => void
  updateData: () => void
}


const UploadModal: FC<UploadModalProps> = ({ hideModal, updateData }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })
  const handleFileDrop = async (files: File[]) => {
    setIsLoading(true)

    try {
      await Promise.all(
        files.map(async (file) => {
          const fileNameParts = file.name.split('.')
          const extension = fileNameParts.pop()
          const title = fileNameParts.join(" ")
          const videoBlob = await convertFileToBlob(file)
          const imageLink = window.origin + '/assets/images/5569190_7d1c.jpg'
          const posterBlob = await linkToBlob(imageLink)
    
          const video: Video = {
            title: title,
            description: title,
            link: videoBlob,
            poster: posterBlob,
            category: 'Divers',
            isAvailable: false,
            created_at: new Date()
          }
    
          await addVideo(video)
    
        }
        ))

      updateData()
      hideModal()
      
    } catch (error) {
      console.error('Une erreur s\'est produite lors du traitement des fichiers :', error);
    }
      
    setIsLoading(false)

  }
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
          {
            isLoading ?
              <Loading />
              :
              <FileDrop
                onFileDrop={handleFileDrop}
              />

          }
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UploadModal;