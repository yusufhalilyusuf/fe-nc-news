
import React, { useEffect, useState } from 'react'
import { getArticles } from '../utils/api'

export default function Articles() {
    const [articles,setArticals] = useState([
        {
          "author": "grumpy19",
          "title": "The Notorious MSG’s Unlikely Formula For Success",
          "article_id": 34,
          "topic": "cooking",
          "created_at": "2020-11-22T11:13:00.000Z",
          "votes": 0,
          "article_img_url": "https://images.pexels.com/photos/2403392/pexels-photo-2403392.jpeg?w=700&h=700",
          "comment_count": "11",
          "total_count": 37
        },
        {
          "author": "tickle122",
          "title": "The battle for Node.js security has only begun",
          "article_id": 12,
          "topic": "coding",
          "created_at": "2020-11-15T13:25:00.000Z",
          "votes": 0,
          "article_img_url": "https://images.pexels.com/photos/10845119/pexels-photo-10845119.jpeg?w=700&h=700",
          "comment_count": "7",
          "total_count": 37
        }])
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
