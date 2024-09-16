/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 16/09/2024 17:14:55
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Home.css';
import Loading from '../../components/Loading/Loading';


interface HomeProps {

}


const Home : FC<HomeProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    // const [value, setValue] = useState('');

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        setLoading(false)
      }
      runLocalData()
    },[])

  return (
    <Fragment>
    {
      loading ?
      <Loading />
      :
      <div className="Home">
          Home Component
      </div>
    }
    </Fragment>
  );
}

export default Home;
