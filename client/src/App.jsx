import { useState, useEffect} from "react";
//import Feed from "./pages/Feed.jsx";
//import NewPost from "./pages/NewPost.jsx";

//it took me 3 million years to split these into components and I still couldn't get it to work so pls allow everything on the App page. You can see my 'working out' in the component pages tho but they are all //'d out. in my defence, the background colour is tomato so that should be worth something amirite?

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
        const response = await fetch("https://database-react-app-server.onrender.com/");
        const data = await response.json();
        setPosts(data);
      };
    
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

    const handleDelete = async (postId) => {
        await fetch(`https://database-react-app-server.onrender.com/${postId}`, {
          method: "DELETE",
        });
      
        fetchData();
      };

  return (
    <div> <div> <form id="newPostForm" onSubmit={handleSubmit}>
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