/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 04/03/2024 16:52:54
*/
import React, { FC, useEffect, useState } from 'react';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


interface HeaderProps {

}


const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate()
  const currentSearchParams = new URLSearchParams(window.location.search)
  const searchQuery = currentSearchParams.get('searchVideo') || ''
  const [searchInput, setSearchInput] = useState<string>(searchQuery);

  console.log(searchQuery);
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      setSearchInput(searchQuery)
    }
    runLocalData()
  },[])

  const handleSearchSubmit = (event: any) =>{
    event.preventDefault()

    const currentSearchParams = new URLSearchParams(window.location.search)
    currentSearchParams.set('searchVideo', searchInput)

    navigate({search: currentSearchParams.toString()})
  }
  

  return (
    <div className="Header sticky-top">
      <nav className="navbar navbar-expand-lg bg-light shadow-lg">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand">Ouitube</Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active"  >Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link active"  >Account</Link>
              </li>
             
             
            </ul>
          <form className="d-flex" role="search" onSubmit={handleSearchSubmit}>
            <input 
            className="form-control me-2" 
            type="search" 
            defaultValue={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
            placeholder="Search" 
            aria-label="Search"
             />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
          </div>
          

        </div>
      </nav>

    </div>
  );
}

export default Header;