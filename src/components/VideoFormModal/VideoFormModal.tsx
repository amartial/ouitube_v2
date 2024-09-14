/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 24/08/2024 14:02:24
*/
import React, { FC, useEffect, useState } from 'react';
import './VideoFormModal.css';
import { Button, Modal } from 'react-bootstrap';
import { Video } from '../../models/Video';
import { convertFileToBlob, convertFileToLink } from '../../helpers/filehelpers';
import { addVideo } from '../../api/api-video';
import Loading from '../Loading/Loading';


interface VideoFormModalProps {
  hideModal: () => void
  updateData: () => void
}


const VideoFormModal : FC<VideoFormModalProps> = ({hideModal, updateData}) =>{

  const [posterPreview, setPosterPreview] = useState<string>("")
  const [videoPreview, setVideoPreview] = useState<string>("")
  const [formSubmitError, setFormSubmitError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const [formData, setFormData] = useState<Video>({
    title: '',
    description: '',
    poster: null,
    link: null,
    category: '',
    isAvailable: true
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});



  useEffect(() => {
    window.scrollTo(0,0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  const handleInputChange = async (event: any) => {
    const { name, value, type, files, checked } = event.target;

    const newValue: any = formData



    if (type === 'checkbox') {
      newValue[name] = checked;
    }else if (type === "file") {
      const file = files[0]
      const link = await convertFileToLink(file)
      if (name === 'poster'){
        if (!file.type.startsWith('image/')) {
          return ;
        }
        setPosterPreview(link)
      }
      if (name === 'link'){
        if (!file.type.startsWith('video/')) {
          return ;
        }
        setVideoPreview(link)
      }
      newValue[name] = files[0];
    }else{
      newValue[name] = value;
    }

    console.log(newValue)

    const errors = formErrors
    delete errors[name]
    setFormErrors({...errors})

    setFormData(newValue)

  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'description is required';
    }

    if (!formData.poster) {
      errors.poster = 'poster is required';
    }

    if (!formData.link) {
      errors.link = 'Video file is required';
    }

    if (!formData.category.trim()) {
      errors.category = 'Please select a category';
    }

    setFormErrors(errors )

    return Object.keys(errors).length === 0

  }

  const handleSubmit = async (event: any) => {

    event.preventDefault();
    if(!validateForm()) {
      return;
    }

    try {
      setIsSubmitted(true)
      const video: Video = formData
      video.created_at = new Date()

      video.poster = await convertFileToBlob(video.poster as File)
      video.link = await convertFileToBlob(video.link as File)

      const result = await addVideo(video)

      if (result.isSuccess) {
        setFormData({
          title: '',
          description: '',
          poster: null,
          link: null,
          category: '',
          isAvailable: false
        })
        updateData()
        hideModal()
      }

    } catch (error) {
      setFormSubmitError('Error, please try again later !')
    }
    setIsSubmitted(false)
  }

  return (
      <div className="VideoFormModal">
          <Modal show={true} size='lg' scrollable>
            <Modal.Header>
              <Modal.Title>Vide Form</Modal.Title>
              <Button onClick={hideModal} className='btn-close'> </Button>
            </Modal.Header>

            <Modal.Body>
              {
                isSubmitted ?
                <Loading/>
                :
                <form action="">
                  {   formSubmitError && <div className="text-danger">{formSubmitError}</div> }
                    <div className="form-group">
                      <label htmlFor='title' className="form-label">Title</label>
                      <input
                        defaultValue={formData.title}
                        type="text" name="title"
                        className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                        placeholder="Enter title"
                        onChange={handleInputChange}
                      />
                      {formErrors.title && <div className='invalid-feedback'>{formErrors.title}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor='description' className="form-label">Description</label>
                      <textarea
                        name="description" id="description"
                        defaultValue={formData.description}
                        className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                      />
                      {formErrors.description && <div className='invalid-feedback'>{formErrors.description}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor='poster' className="form-label">Image (poster) :</label>
                      <input
                        type="file"
                        name="poster"
                        accept='image/*'
                        className={`form-control ${formErrors.poster ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                      />
                      {
                        posterPreview && <div className="preview-image card my-2">
                        <img className='img-fluid' width={'100%'} src={posterPreview} alt="" />
                      </div>
                      }

                      {formErrors.poster && <div className='invalid-feedback'>{formErrors.poster}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor='link' className="form-label">Video :</label>
                      <input
                        type="file"
                        name="link"
                        accept='video/*'
                        className={`form-control ${formErrors.link ? 'is-invalid' : ''}`}
                        onChange={handleInputChange}
                      />
                      {
                        videoPreview && <div className="video-preview card my-2">
                          <video controls src={videoPreview} width={'100%'}></video>
                        </div>
                      }
                      {formErrors.link && <div className='invalid-feedback'>{formErrors.link}</div>}
                    </div>
                    <div className="form-group">
                      <label htmlFor='category' className="form-label">Categories :</label>
                      <select defaultValue={formData.category} onChange={handleInputChange} name="category" id="category" className={`form-control ${formErrors.category ? 'is-invalid' : ''}`}>
                        <option value="1">Select video categories </option>
                        <option value="Politique">Politique</option>
                        <option value="Education">Education</option>
                        <option value="Culture">Culture</option>
                        <option value="Formation">Formation</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <div className="form-check form-switch">
                        <input
                          name='isAvailable'
                          type="checkbox"
                          className={`form-check-input ${formErrors.isAvailable ? 'is-invalid' : ''}`}
                          id="flexSwitchCheckChecked"
                          defaultChecked={formData.isAvailable} />
                        <label htmlFor='isAvailable' className="form-label">Is Available :</label>
                      </div>
                    </div>
                </form>
              }

            </Modal.Body>

            <Modal.Footer>
              <Button variant='primary'>Cancel </Button>
              <Button variant='cuccess' onClick={handleSubmit}>Save Video </Button>
            </Modal.Footer>
          </Modal>
      </div>
  );
}

export default VideoFormModal;