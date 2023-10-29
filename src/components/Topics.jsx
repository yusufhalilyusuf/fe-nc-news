import React from 'react'
import { Link ,useNavigate} from "react-router-dom";
export default function Topics(topics) {
    const topicArray = topics.topics
  return (
    <div className='center'>
        {
            topicArray.map(topic=>{
                return (
                    <div key={topic.description}>
                        <br />
                    <Link to={`/articles/topics/${topic.slug}`}>{topic.slug.toUpperCase()}</Link> 
                    
                    <br />
                    </div>
                )
            })
        }
    </div>
  )
}
