import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import {useMemo, useState} from "react";
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import PostFilter from "./components/PostFilter/PostFilter";
import './App.css';

function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'cc', body: 'ee'},
      {id: 2, title: 'hh', body: 'ff'},
      {id: 3, title: 'aa', body: 'yy'}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});

  const sortedPosts = useMemo(() => {
      if(filter.sort) {
          return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
      }
      return posts;
  }, [filter.sort, posts]);

  const sortedAndSearchedPosts = useMemo(() => {
      return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
  }, [filter.query, sortedPosts]);

  const createPost = (newPost) => {
      setPosts([...posts, newPost]);
  }

  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
        <Counter/>
        <ClassCounter/>
        <PostForm create={createPost}/>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts About JS'/>

    </div>
  );
}

export default App;
