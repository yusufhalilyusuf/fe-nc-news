// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Articles from "./components/Articles";
import Home from "./components/Home";
import SingleArticle from "./components/SingleArticle";

function App() {
  const [articleId, setArticleId] = useState()

  return (
    <>
    
      <main className="main">

      <h1 style={{textAlign:"center"}}>Welcome to Nc News</h1>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/articles/' element={<Articles setArticleId={setArticleId} articleId={articleId}/>} />
          <Route path='/articles/:article_id/' element={<SingleArticle />} />
        </Routes>
      </main>
      </>

  );
}

export default App;
