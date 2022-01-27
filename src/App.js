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

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNewPost = (e) => {
      e.preventDefault();
      const newPost = {
          id: Date.now(),
          title,
          body
      }
      setPosts([...posts, newPost]);
      setTitle('');
      setBody('');
  }

  return (
    <div className="App">
        <Counter/>
        <ClassCounter/>
        <form>
            {/*Управляемый компонент*/}
            <MyInput value={title}
                     onChange={e => setTitle(e.target.value)}
                     type="text"
                     placeholder='Post name'
            />
            {/*Неуправляемый компонент*/}
            <MyInput
                value={body}
                onChange={e => setBody(e.target.value)}
                type="text"
                placeholder='Post description'/>
            <MyButton onClick={addNewPost}>CREATE POST</MyButton>
        </form>
        <PostList posts={posts} title='Posts About JS'/>
    </div>
  );
}

export default App;
