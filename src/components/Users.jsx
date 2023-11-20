import React from "react";
import { useState, useEffect, useContext } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "../contexts/Usercontext";
export default function Users() {
  const { authUser, setAuthUser } = useContext(UserContext);
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setIsLoading(false);
    });
  }, []);

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
      <div className='center'>
        <p>Please select a user</p>
      </div>
      <div className='flex'>
        {users.map((user) => {
          return (
            <div
              className='article'
              onClick={() => {
                setAuthUser(user);
                alert('User is selected')
                window.location.href='/articles'
                
              }}
              key={user.name}
              value={user.username}
            >
              <p className='box center'>{user.name} </p>
              <img key={user.name} src={user.avatar_url} alt='' />
              <p className='box center'>{user.username}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}
