/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/03/2024 16:52:54
*/
import React, { FC, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';


interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {

    }
    runLocalData()
  })

  return (
    <div className="Header">
      <nav className="navbar navbar-expand-lg bg-light shadow-lg">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Ouitube</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link active" >Accounts</Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>

        </div>
      </nav>

    </div>
  );
}

export default Header;