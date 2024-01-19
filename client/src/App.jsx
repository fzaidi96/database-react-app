import { useState, useEffect } from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import Home from "./pages/Home";
// import Feed from "./pages/Feed";
// import NewPost from "./pages/NewPost";
// I decided not to go ahead with these components because I don't want to break something that currently works. It would be quite useful to have a walkthrough on this as part of my feedback. I think it's something to do with passing props and 'bubbling up' but I've spent quite a while on getting everything below working and I keep breaking things when fiddling. But I did some of the stretch goals instead :) 

export default function App() {

const [posts, setPosts] = useState([]);
const [newPost, setNewPost] = useState({
    username: "",
    post: "",
    topic: "", 
  });
const availableTopics = ["#music", "#movies", "#sports"];
const [selectedTopic, setSelectedTopic] = useState("");
  

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/");
    const data = await response.json();
    setPosts(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    fetchData();
    setNewPost({
      username: "",
      post: "",
      topic: "",
    });
    setSelectedTopic("");
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDelete = async (postId) => {
    await fetch(`http://localhost:8080/${postId}`, {
      method: "DELETE",
    });
  
    fetchData();
  };

  return (
    <div>
      <form id="newPostForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          name="username"
          value={newPost.username}
          onChange={(e) => setNewPost({ ...newPost, username: e.target.value })}
          placeholder="Username"
        />
        <label>Post</label>
        <textarea
          name="post"
          value={newPost.post}
          onChange={(e) => setNewPost({ ...newPost, post: e.target.value })}
          placeholder="Type your post here"
        ></textarea>
        <label>Topic</label>
        <select
          name="topic"
          value={newPost.topic}
          onChange={(e) => setNewPost({ ...newPost, topic: e.target.value })}
        >
          <option value="">Select a topic</option>
          {availableTopics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
        <button type="submit">Share</button>
      </form>
      

      <div className="newsfeed">
        <h2>news feed</h2>


        <div id="feed">
          {posts.map((post) => (
            <div key={post.id}>
              <strong>{post.username}</strong>: {post.post} | {post.topic}
              <button onClick={() => handleDelete(post.id)}>x</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}