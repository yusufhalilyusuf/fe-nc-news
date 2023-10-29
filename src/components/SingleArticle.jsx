import { useEffect, useState, useContext } from "react";
import {
  deleteComment,
  getArticleById,
  getAuthorByName,
  getCommentsByArticleId,
  postComment,
  updateVotes,
} from "../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/Usercontext";
export default function SingleArticle() {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState();
  const [showComments, setShowComments] = useState(false);
  const { article_id } = useParams();
  const [article, setArticle] = useState();
  const [author, setAuthor] = useState();
  const [showVote, setShowVote] = useState(false);
  const [userVote, setUserVote] = useState(0);
  const [userComment, setUserComment] = useState(null);
  const { authUser } = useContext(UserContext);
  const updateVote = (val) => {
    setUserVote((curr) => {
      return curr + val;
    });
    updateVotes(article_id, val).catch(() => {
      setUserVote(0);
      return alert("please try again");
    });
  };
  const submitCommentHandler = () => {
    postComment(article_id,userComment)
      setUserComment(null)
   
  };

  const deleteHandler= (id)=>{
    deleteComment(id).then(res=>{
      console.log(id);
      res.status===204? alert('success'): alert('something went wrong')
    }).catch(()=>{
      alert('something went wrong')
    })
  }

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
  }, []);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((response) => {
      setComments(response);
    });
  }, [comments]);

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
              setShowVote(!showVote);
            }}
          >
            Vote Article
          </button>
          <br />
          <div>
            {showVote ? (
              <div className='flex'>
                <button
                  disabled={userVote === +1}
                  onClick={(e) => {
                    console.log(e);
                    updateVote(1);
                  }}
                >
                  +
                </button>
                <p>{article.votes + userVote}</p>
                <button
                  disabled={userVote === -1}
                  onClick={() => {
                    updateVote(-1);
                  }}
                >
                  -
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <button
        id="show"
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e);
              e.target[1].disabled=true
              submitCommentHandler();
              e.target[0].value=''
              e.target[1].disabled=false
              

            }}
            className='center'
          >
            <label>Add Comments:</label>
            <br />
            <textarea required
              onChange={(e) => {
                setUserComment(e.target.value);
              }}
              id='text'
              name='text'
              rows='12'
              cols='50'
            ></textarea>
            <br />
            <button className='sbt-button'type='submit'>Submit</button>
          </form>
        ) : (
          <p></p>
        )}
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
                    {
                       authUser.username===comment.author ? (
                        <button type='button' id="delete" onClick={()=>{
                          deleteHandler(comment.comment_id)
                        }}>Delete</button>
                      ) : null
                    }
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
