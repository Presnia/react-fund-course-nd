import {useMemo, useState} from "react";
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import PostFilter from "./components/PostFilter/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import './App.css';
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
      {id: 1, title: 'cc', body: 'ee'},
      {id: 2, title: 'hh', body: 'ff'},
      {id: 3, title: 'aa', body: 'yy'}
  ]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);

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
      setModal(false);
  }

  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id));
  }

  return (
    <div className="App">
        <MyButton onClick={() => setModal(true)}>
            Create User
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>
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
