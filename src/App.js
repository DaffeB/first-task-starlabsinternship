import React, { useEffect, useState } from 'react';
import './styles.css';

const App = () => {
  const [todoData, setTodoData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [postData, setPostData] = useState([]);

  const BASE_URL = 'https://jsonplaceholder.typicode.com/';

  const fetchTodoData = async () => {
    try {
      const response = await fetch(BASE_URL + 'todos/1');
      const json = await response.json();
      setTodoData(json);
    } catch (error) {
      console.error('Error fetching todo data:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(BASE_URL + 'users');
      const json = await response.json();
      setUserData(json);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCommentData = async () => {
    try {
      const response = await fetch(BASE_URL + 'comments');
      const json = await response.json();
      setCommentData(json);
    } catch (error) {
      console.error('Error fetching comment data:', error);
    }
  };

  const fetchPostData = async () => {
    try {
      const response = await fetch(BASE_URL + 'posts');
      const json = await response.json();
      setPostData(json);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  useEffect(() => {
    fetchTodoData();
    fetchUserData();
    fetchCommentData();
    fetchPostData();
  }, []);

  const groupedUserPosts = userData.map((user) => {
    const posts = postData.filter((post) => post.userId === user.id);
    const comments = commentData.filter((comment) => posts.some((post) => post.id === comment.postId));
    return { user, posts, comments };
  });

  return (
    <div className='container'>
      <h1 className='main-title'>USERS, COMMENTS, POSTS</h1>
      {todoData ? (
        <div className='todo-section'>
          <p className='todo-title'>Title: {todoData.title}</p>
          <p className='todo-completed'>Completed: {todoData.completed ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p className='loading-data'>Loading data.</p>
      )}

      <h1 className='sub-title'>Users, Posts, and Comments</h1>
      {groupedUserPosts.map((userPost) => (
        <div key={userPost.user.id} className='user-post'>
          <h2 className='user-name'>{userPost.user.name}'s Posts</h2>
          {userPost.posts.map((post) => (
            <p key={post.id} className='post-box'>{post.title}</p>
          ))}
          <h2 className='user-name'>{userPost.user.name}'s Comments</h2>
          {userPost.comments.map((comment) => (
            <p key={comment.id} className='comment-name'>{comment.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;

