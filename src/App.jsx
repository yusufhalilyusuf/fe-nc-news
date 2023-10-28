// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import { useState,useEffect } from "react";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import { getTopics } from "./utils/api";

function App() {
  const [topics, setTopics] = useState();
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
      setIsLoading(false)
    });
  }, []);
  
  

  return isLoading ? (
    <div className='wrapper'>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='circle'></div>
      <div className='shadow'></div>
      <div className='shadow'></div>
      <div className='shadow'></div>
      <span>Loading</span>
    </div>
  ) : (
    <>
    
      <main className="main">

      <h1 style={{textAlign:"center"}}>Welcome to Nc News</h1>
        <Navbar topics = {topics}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles/' element={<Articles />} />
          <Route path='/articles/:article_id/' element={<SingleArticle />} />
          <Route path='/articles/topics/:topic' element={<Articles />} />
        </Routes>
      </main>
      </>

  );
}

export default App;
