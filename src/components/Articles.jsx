import { useEffect, useState, } from "react";
import { getArticles } from "../utils/api";
import { Routes, Route, useNavigate, } from "react-router-dom";
import SingleArticle from "./SingleArticle";

export default function Articles() {
  const [articleId, setArticleId] = useState()
  const [articles, setArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    getArticles().then((response) => {
      setArticals(response);
      setIsLoading(false);
    });

  
   
    
  }, []);
  const navigate = useNavigate();
  useEffect(()=>{
    if(articleId){
      navigate(`/articles/${articleId}`)
      setArticleId(null)
    }
  },[articleId])

  
 
  

  return isLoading ? (
    <p>still loading </p>
  )  :(
  
    

      <div className='flex'>
        {articles.map((article) => {
         
          return (
            
            <div onClick={()=>{
              setArticleId(article.article_id)
              
            }}  className='article' key={article.article_id}>
              <img
                src={article.article_img_url}
                alt={"an image related to " + article.title}
              />
              <p className='box'>
                {" "}
                <strong>{"Title: "}</strong>
                {article.title}
              </p>
              <p className='box'>
                {" "}
                <strong>{"Author: "}</strong>
                {article.author}
              </p>
              <p className='box'>
                <strong>{"Topic: "}</strong>
                {article.topic.toUpperCase()}
              </p>
              <p className='box'>
                <strong>{"Comments: "}</strong>
                {article.comment_count}
              </p>
              <p className='box' style={{ display: "none" }}>
                <strong>{"Article id: "}</strong>
                {article.article_id}
              </p>
          
            </div>
          );
        })}
      </div>
    
  );
}
