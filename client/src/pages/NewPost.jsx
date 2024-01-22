//import { useState, useEffect} from "react";

export default function NewPost() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        username: "",
        post: "",
        topic: "", 
      });
    const availableTopics = ["#music", "#movies", "#sports"];
    const [selectedTopic, setSelectedTopic] = useState("");
    
    const handleSubmit = async (event) => {
    event.preventDefault();
    
       await fetch("https://database-react-app-server.onrender.com/", {
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


    return <div>
        <div> <form id="newPostForm" onSubmit={handleSubmit}>
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
  </div>

    </div>
}