import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
// import Footer from './components/Footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Account from './pages/Account/Account';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import MediaReader from './pages/MediaReader/MediaReader';

function App() {

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
            <Route path='/' element={<Home/>}  />
            <Route path='/account' element={<Account/>}  />
            <Route path='/reader/:slug' element={<MediaReader/>}  />
            <Route path='/*' element={<ErrorPage/>}  />

        </Routes>
    </BrowserRouter>
  );
}

export default App;
