import { useContext } from "react";
import { UserContext } from "../contexts/Usercontext";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar(topics) {
  const topicArray = topics.topics;
  const { authUser } = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <div className='topnav' id='myTopnav'>
      <Link to='/' className='active'>
        Home
      </Link>
      <Link to='/articles'>ARTICLES</Link>
      <Link to='/articles/topics'>TOPICS</Link>
      <Link to='/users'>USERS</Link>
      <Link to=''>CONTACT</Link>
      <button>
        {" "}
        <img className='avt' src={authUser.avatar_url} alt='' />
      </button>
    </div>
  );
}
