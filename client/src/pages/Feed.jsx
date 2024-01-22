//import { useState, useEffect} from "react";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
    const response = await fetch("https://database-react-app-server.onrender.com");
    const data = await response.json();
    setPosts(data);
  };

    const handleDelete = async (postId) => {
    await fetch(`https://database-react-app-server.onrender.com/${postId}`, {
      method: "DELETE",
    });
  
    fetchData();
  };
    return <div className="newsfeed">
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
}