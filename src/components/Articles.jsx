
import React, { useEffect, useState } from 'react'
import { getArticles } from '../utils/api'

export default function Articles() {
    const [articles,setArticals] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        getArticles().then((response)=>{
            setArticals (response);
            console.log(response);
            console.log(articles);
            setIsLoading(false)
        })
    },[])

   
  return  isLoading ? <p>still loading </p>:(
    <div className='flex'>
      {articles.map((article) => {
        
        return (
          <div className='article' key={article.article_id}>
            <img src={article.article_img_url} alt={'an image related to '+ article.title} />
            <p className='box'> <strong>{'Title: '}</strong>{ article.title}</p>
            <p className='box'> <strong>{'Author: '}</strong>{ article.author}</p>
            <p className='box'><strong>{'Topic: '}</strong>{article.topic.toUpperCase()}</p>
            <p className='box'><strong>{'Comments: '}</strong>{article.comment_count}</p>
          </div>
        );
      })}
    </div>
  )
}
