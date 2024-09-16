/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/03/2024 11:17:21
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
import './ErrorPage.css';


interface ErrorPageProps {
 
}


const ErrorPage : FC<ErrorPageProps> = () =>{


  

  return (
    <Fragment>
   
      <div className="ErrorPage">
          <h2>404 </h2>
          <p>Page not found !</p>
      </div>
   
    </Fragment>
  );
}

export default ErrorPage;