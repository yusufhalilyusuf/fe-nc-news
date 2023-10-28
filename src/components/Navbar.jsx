

export default function Navbar(topics) {
 const topicArray = topics.topics

  return (
    <div className="topnav" id="myTopnav">
    <a href="/" className="active">Home</a>
    <a href="/articles">ARTICLES</a>
    
    <div className="dropdown">
      <button className="dropbtn">TOPICS 
        <i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
       {
        topicArray.map(topic=>{
          return (
            <a key={topic.description} href={`/articles/topics/${topic.slug}`}>{topic.slug.toUpperCase()}</a>
          )
        })

       }
      </div>
    </div> 
   <a href="#contact">USERS</a>
    <a href="#contact">CONTACT</a>
    <a href="#about">ABOUT</a>
  </div>
  );
}
