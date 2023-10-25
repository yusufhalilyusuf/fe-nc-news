import { useEffect, useState } from "react";
import { getArticleById, getAuthorByName } from "../utils/api";
import { useParams } from "react-router-dom";
export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [author, setAuthor] = useState({
    "username": "tickle122",
    "name": "Tom Tickle",
    "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
  });

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response[0]);

        return response[0].author;
      })
      .then((aut) => {
        return getAuthorByName(aut);
      })
      .then((response) => {
        console.log(response);
        setAuthor(response);
      });
  }, []);

  return (
    <>
    
      <ul className='team'>
        <li className='member co-funder'>
          <div className='thumb'>
            <img src={author.avatar_url} />
          </div>
          <div className='description'>
            <h3>{author.name}</h3>
            <p>{
                ` Meet ${author.name.split(' ')[0]}, our best author and storyteller. With a gift for crafting engaging narratives, he brings words to life through captivating stories and articles`
                
                }
            </p>{" "}
            <br />
            <a className='user-name'href=''>{author.username}</a>
          </div>
        </li>
      </ul>
      <div className='center'>
        <img className='img-single' src={article.article_img_url} alt='' />
        <h1 className='center'>{article.title}</h1>
        <p className="">{article.body}</p>
        <button>Show Comments</button>
      </div>
    </>
  );
}
