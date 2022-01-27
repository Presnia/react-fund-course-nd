import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import {useState} from "react";
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import './App.css';

function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'Javascript 1', body: 'Javascript - programming language'},
      {id: 2, title: 'Javascript 2', body: 'Javascript - programming language'},
      {id: 3, title: 'Javascript 3', body: 'Javascript - programming language'}
  ]);

  const createPost = (newPost) => {
      setPosts([...posts, newPost]);
  }

  return (
    <div className="App">
        <Counter/>
        <ClassCounter/>
        <PostForm create={createPost}/>
        <PostList posts={posts} title='Posts About JS'/>
    </div>
  );
}

export default App;
