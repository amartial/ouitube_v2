/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 14/09/2024 18:38:20
*/
import React, { FC, useEffect } from 'react';
import './ViewVideoModal.css';


interface ViewVideoModalProps {
 
}


const ViewVideoModal : FC<ViewVideoModalProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="ViewVideoModal">
          ViewVideoModal Component
      </div>
  );
}

export default ViewVideoModal;
