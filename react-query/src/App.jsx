import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Posts from './pages/Posts';
import BitcoinPrice from './pages/RefetchInterval';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/posts' element={<Posts/>} />
        <Route path="/bitcoin" element ={<BitcoinPrice/> }/>
      </Routes>
    </BrowserRouter>
  );
}
