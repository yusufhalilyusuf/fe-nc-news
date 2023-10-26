import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-pcfh.onrender.com/api",
});

export const getArticles = () => {

  return ncNews.get("/articles?limit=all").then((response)=>{
    return response.data.articles
  })
};

export const getArticleById= (id)=>{
  return ncNews.get(`/articles/${id}`).then((response)=>{
    return response.data.article
  })
}

export const getAuthorByName = (username)=>{
  return ncNews.get(`/users/${username}`).then((response)=>{
    return response.data.user[0]
  })
}
