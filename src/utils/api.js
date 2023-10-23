import axios from "axios";

const ncNews = axios.create({
  baseURL: "https://nc-news-pcfh.onrender.com/api",
});

export const getArticles = () => {

  return ncNews.get("/articles?limit=all").then((response)=>{
    return response.data.articles
  })
};
