import React from 'react';
import { Route, Routes } from "react-router";
import NavBar from './NavBar';

const Home = () => {
  return (
    <div >
    <Routes >
      <Route path='/' element={<NavBar/>}>
      </Route>
    </Routes>
  
  </div>
  )
}

export default Home
