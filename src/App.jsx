// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import Home from "./components/Home";

function App() {
  return (
    
      <>
      <main>

      <h1 style={{textAlign:'center'}}>Welcome to Nc News</h1>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles' element={<Articles />} />
        </Routes>
      </main>
      </>

  );
}

export default App;
