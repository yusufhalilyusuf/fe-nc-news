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

export const getCommentsByArticleId = (id)=>{
  return ncNews.get(`/articles/${id}/comments`).then((response)=>{
    return response.data.comments
  })
}

export const updateVotes = async (id,value)=>{
  await ncNews.patch(`/articles/${id}`,{inc_votes:value})
  
}




export const getUsers = async ()=>{
  const {data} = await ncNews.get('/users');
  return data.users
}

export const postComment = (id,body)=>{
   ncNews.post(`/articles/${id}/comments`,{body:body,username:'tickle122'}).then((response)=>{

    if(response.status ===201 ){ alert('your comment has been submitted')
    location.reload()
  } else{
      alert('sorry something went wrong please try again');
      location.reload()
    }
   }).catch(()=>{
    alert('sorry something went wrong please try again');
    location.reload()
   })
  
}

export const getTopics =  ()=>{
    return ncNews.get('/topics').then(res=>{
     
      return res.data.topics
    })
  
}
 
