import { useEffect, useState } from "react";
import {
  getArticleById,
  getAuthorByName,
  getCommentsByArticleId,
  updateVotes,
} from "../utils/api";
import { useParams } from "react-router-dom";

export default function SingleArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [author, setAuthor] = useState();
  const [showVote, setShowVote] = useState(false);
  const [userVote, setUserVote] = useState(0);

  const submitVoteHandler = (e) => {
    e.preventDefault();
    setUserVote(Number(e.target[0].value));
  };
  useEffect(()=>{
    updateVotes(article_id, userVote).catch((e) => {
        return alert(e);
      });
  },[userVote])

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response[0]);
        return response[0].author;
      })
      .then((auth) => {
        return getAuthorByName(auth);
      })
      .then((response) => {
        setAuthor(response);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((response) => {
      setComments(response);
    });
  }, [article_id]);

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
            <div>
              <p>
                <strong>Creation Date: </strong>{" "}
                {article.created_at.slice(0, 10)}
              </p>
              <p>
                <strong>Article Id: </strong> {article.article_id}
              </p>
              <p>
                <strong>Votes : </strong> {article.votes + Number(userVote)}
              </p>
              <p>
                <strong>Topic : </strong> {article.topic}
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className='center'>
        <img className='img-single' src={article.article_img_url} alt='' />
        <h1 className='center'>{article.title}</h1>
        <p className=''>{article.body}</p>
        <section>
          <button
            onClick={() => {
              setShowVote(true);
            }}
          >
            Vote Article
          </button>
          <br />
          <div>
            {showVote ? (
              <form onSubmit={submitVoteHandler}>
                <label>
                  Vote
                  <input type='number' />
                </label>
                <button type='submit'>Submit</button>
              </form>
            ) : null}
          </div>
        </section>

        <button
          onClick={() => {
            setShowComments(!showComments);
          }}
          type='submit'
        >{`${showComments ? "Hide" : "Show"} Comments ${
          showComments ? "" : "(" + article.comment_count + ")"
        }`}</button>
      </div>

      <div>
        {showComments ? (
          <div id='content'>
            {comments.map((comment) => {
              return (
                <div key={comment.comment_id} className='testimonial'>
                  <blockquote>{comment.body}</blockquote>
                  <div></div>
                  <section className='flex2'>
                    <p>
                      <strong>{comment.author}</strong>{" "}
                    </p>
                    <p>
                      <strong> Votes: </strong>
                      {comment.votes}
                    </p>
                  </section>
                </div>
              );
            })}
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
