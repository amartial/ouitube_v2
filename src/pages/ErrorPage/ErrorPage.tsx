/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/09/2024 18:31:14
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './ErrorPage.css';
import Loading from '../../components/Loading/Loading';


interface ErrorPageProps {

}


const ErrorPage : FC<ErrorPageProps> = () =>{


  return (
    <Fragment>

      <div className="ErrorPage">
          <h2>404</h2>
          <p>Page not found !</p>
      </div>

    </Fragment>
  );
}

export default ErrorPage;
