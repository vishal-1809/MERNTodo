import './App.css';
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './MyComponents/Main';
import Register from './MyComponents/Register';
import Login from './MyComponents/Login';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
