import { useEffect, useState,  } from "react";
import { getArticles } from "../utils/api";
import { useNavigate, useParams, useSearchParams,createSearchParams } from "react-router-dom";
import * as React from "react";

export default function Articles() {
  const [articleId, setArticleId] = useState();
  const [articles, setArticals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { topic } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
console.log(searchParams.get('sort_by'),searchParams.get('order'));
  useEffect(() => {
    getArticles(searchParams.get('sort_by'), searchParams.get('order')).then((response) => {
      if (topic) {
        setArticals(response.filter((x) => x.topic === topic));
        setIsLoading(false);
      } else {
        setArticals(response);
        setIsLoading(false);
      }
    });
  }, [searchParams]);
  const navigate = useNavigate();
  useEffect(() => {
    if (articleId) {
      navigate(`/articles/${articleId}`);
      setArticleId(null);
    }
  }, [articleId]);

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
      <div className='flex'>
        <label
          onChange={(e) => {
          
           searchParams.set(e.target.name ,e.target.value)
            setSearchParams(
             searchParams
            )
          }}
          htmlFor=''
        >
          {" "}
          {`Sort By `}
          <select className='center' name='sort_by' defaultValue='created_at'>
            <option id='check' value='created_at'>
              Date
            </option>
            <option value='votes'>Votes</option>
            <option value='comment_count'>Comment Count</option>
          </select>
        </label>
        <label
          onChange={(e) => {
          
            searchParams.set(e.target.name ,e.target.value)
            setSearchParams(
             searchParams
            )
          }}
          htmlFor=''
        >
          {" "}
          {` Order By `}
          <select className='center' name='order' id='order' defaultValue='asc'>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </label>
      </div>

      <div className='flex'>
        {articles.map((article) => {
          return (
            <div
              onClick={() => {
                setArticleId(article.article_id);
              }}
              className='article'
              key={article.article_id}
            >
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
              <p className='box'>
                <strong>{"Votes: "}</strong>
                {article.votes}
              </p>
              <p className='box'>
                <strong>{"Date: "}</strong>
                {article.created_at.slice(0, 10)}
              </p>
              <p className='box' style={{ display: "none" }}>
                <strong>{"Article id: "}</strong>
                {article.article_id}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
