import { useEffect, useState } from "react";
import { getArticleById, getAuthorByName } from "../utils/api";
import { useParams } from "react-router-dom";
export default function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({
    "author": "jessjelly",
    "title": "Who are the most followed clubs and players on Instagram?",
    "article_id": 19,
    "topic": "football",
    "created_at": "2020-09-13T12:02:00.000Z",
    "votes": 0,
    "article_img_url": "https://images.pexels.com/photos/685382/pexels-photo-685382.jpeg?w=700&h=700",
    "comment_count": "13",
    "total_count": 37
  });
  const [author, setAuthor] = useState({
    username: "tickle122",
    name: "Tom Tickle",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
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
      <div className='flex1'>
        <ul className='team'>
          <li className='member author'>
            <div className='thumb'>
              <img src={author.avatar_url} />
            </div>
            <div className='description'>
              <h3>{author.name}</h3>
              <p>
                {` Meet ${
                  author.name.split(" ")[0]
                }, our best author and storyteller. With a gift for crafting engaging narratives, he brings words to life through captivating stories and articles`}
              </p>{" "}
              <br />
             <p>
                <strong>Nickname: </strong> {author.username}
             </p>
            </div>
          </li>
        </ul>
        <ul className='team'>
          <li className='member details'>
            <div id=''>
              <p><strong>Creation Date: </strong> {article.created_at.slice(0,10)}</p>
              <p><strong>Article Id: </strong> {article.article_id}</p>
              <p><strong>Votes : </strong> {article.votes}</p>
              <p><strong>Topic : </strong> {article.topic}</p>
            </div>
          </li>
        </ul>
      </div>

      <div className='center'>
        <img className='img-single' src={article.article_img_url} alt='' />
        <h1 className='center'>{article.title}</h1>
        <p className=''>{article.body}</p>
        <button type="submit">{`Show Comments (${article.comment_count})`}</button>
      </div>
    </>
  );
}
