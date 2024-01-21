import { Link } from "react-router-dom";

export default function Home() {
    return (
      <header>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/newsfeed">News Feed</Link>
            <Link to="new_post">Create new post</Link>
        </nav>
      </header>
    );
  }