import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import {useState} from "react";
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import './App.css';
import MySelect from "./components/UI/select/MySelect";

function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'Javascript 1', body: 'Javascript - programming language'},
      {id: 2, title: 'Javascript 2', body: 'Javascript - programming language'},
      {id: 3, title: 'Javascript 3', body: 'Javascript - programming language'}
  ]);
  const [selectedSort, setSelectedSort] = useState('');

  const createPost = (newPost) => {
      setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id));
  }

  const sortPosts = (sort) => {
      setSelectedSort(sort);
      setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
  }

  return (
    <div className="App">
        <Counter/>
        <ClassCounter/>
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <div>
            <MySelect
                value={selectedSort}
                onChange={sortPosts}
                defaultValue='Sort by'
                options={[
                    {value: 'title', name: 'By name'},
                    {value: 'body', name: 'By description'}
                ]}
            />
        </div>
        {
            posts.length
            ? <PostList remove={removePost} posts={posts} title='Posts About JS'/>
            : <h1 style={{textAlign: 'center'}}>
                    No Posts Yet
              </h1>
        }

    </div>
  );
}

export default App;
