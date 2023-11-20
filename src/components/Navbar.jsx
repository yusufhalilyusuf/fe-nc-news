import { useContext } from "react";
import { UserContext } from "../contexts/Usercontext";
import { Link } from "react-router-dom";
export default function Navbar(topics) {

  const { authUser } = useContext(UserContext);

  

  return (
    <div className='topnav' id='myTopnav'>
      <Link to='/' className='active'>
        HOME
      </Link>
      <Link to='/articles'>ARTICLES</Link>
      <Link to='/articles/topics'>TOPICS</Link>
      <Link to='/users'>USERS</Link>
      {/* <Link to=''>CONTACT</Link> */}
      <Link to='/users'>
        {" "}
        <img className='avt' src={authUser.avatar_url} alt='some  text' />
      </Link>
    </div>
  );
}
