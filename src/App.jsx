// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";
import { getTopics } from "./utils/api";
import Users from "./components/Users";
import Topics from "./components/Topics";
import ErrorPage from "./components/ErrorPage";

function App() {
  const [topics, setTopics] = useState();
  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    getTopics().then((res) => {
      setTopics(res);
      setIsLoading(false);
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
   {console.log(topics)}
      <main className='main'>
        <h1 style={{ textAlign: "center" }}>Welcome to Nc News</h1>
        <Navbar  />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles/' element={<Articles topics={topics}/>} />
          <Route path='/articles/:article_id/' element={<SingleArticle />} />
          <Route path='articles/topics/' element={<Topics topics={topics} />} />
          <Route path='/articles/topics/:topic' element={<Articles topics={topics}/>} />
          <Route path='/users' element={<Users />} />
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
      </main>
    </>
    
  );
}

export default App;
