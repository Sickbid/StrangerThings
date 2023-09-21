import React, { useState, useEffect } from 'react';
import '../App.css';

const COHORT_NAME = '2302-ACC-ET-WEB-PT-D';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function Posts({ token }) {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const data = await response.json();
        setPosts(data.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        alert("Failed to fetch posts. Please try again.");
      }
    }

    fetchPosts();
  }, []);

  const addPost = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          post: {
            title: postTitle,
            description: postDescription
          }
        })
      });
      const data = await response.json();
      if (data.success) {
        setPosts([...posts, data.data]);
      }
    } catch (error) {
      console.error("There was an error adding the post:", error);
      alert("Failed to add post. Please try again.");
    }
  };

  const editPost = async (postId) => {
    const editPost = async (postId) => {
      try {
          const response = await fetch(`${BASE_URL}/posts/${postId}`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                  post: {
                      title: postTitle,
                      description: postDescription
                  }
              })
          });
          const data = await response.json();
          if (data.success) {
              const updatedPosts = posts.map(post => 
                  post._id === postId ? data.data : post
              );
              setPosts(updatedPosts);
              setEditingPost(null);
          } else {
              alert(data.error.message);
          }
      } catch (error) {
          console.error("There was an error editing the post:", error);
          alert("Failed to edit post. Please try again.");
      }
  };
  
  };
// I couldn't make it work without it, not sure.
  const deletePost = async (postId) => {
    const deletePost = async (postId) => {
      try {
          const response = await fetch(`${BASE_URL}/posts/${postId}`, {
              method: 'DELETE',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
          const data = await response.json();
          if (data.success) {
              const updatedPosts = posts.filter(post => post._id !== postId);
              setPosts(updatedPosts);
          } else {
              alert(data.error.message);
          }
      } catch (error) {
          console.error("There was an error deleting the post:", error);
          alert("Failed to delete post. Please try again.");
      }
  };
  
  };

  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={e => {
        e.preventDefault();
        if (editingPost) {
          editPost(editingPost);
        } else {
          addPost();
        }
        setPostTitle('');
        setPostDescription('');
      }}>
        <input 
          name="title" 
          placeholder="Title" 
          required 
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <textarea 
          name="description" 
          placeholder="Description" 
          required 
          value={postDescription}
          onChange={(e) => setPostDescription(e.target.value)}
        />
        <button type="submit">{editingPost ? 'Update Post' : 'Add Post'}</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <button onClick={() => {
              setEditingPost(post._id);
              setPostTitle(post.title);
              setPostDescription(post.description);
            }}>Edit</button>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
