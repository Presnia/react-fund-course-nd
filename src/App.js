import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import {useState} from "react";
import PostList from "./components/PostList/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import './App.css';



function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'Javascript 1', body: 'Javascript - programming language'},
      {id: 2, title: 'Javascript 2', body: 'Javascript - programming language'},
      {id: 3, title: 'Javascript 3', body: 'Javascript - programming language'}
  ]);

  return (
    <div className="App">
        <Counter/>
        <ClassCounter/>
        <form>
            <MyInput type="text" placeholder='Post name'/>
            <MyInput type="text" placeholder='Post description'/>
            <MyButton>CREATE POST</MyButton>
        </form>
        <PostList posts={posts} title='Posts About JS'/>
    </div>
  );
}

export default App;
