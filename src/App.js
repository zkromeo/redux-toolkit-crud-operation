import { Routes, Route } from "react-router-dom"
import CreatePost from "./component/CreatePost";
import Post from "./component/Post";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
