import {useEffect, useState} from "react";
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import PostFilter from "./components/PostFilter/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  async function fetchPosts() {
      setIsPostLoading(true);
      const posts = await PostService.getAllPosts();
      setPosts(posts);
      setIsPostLoading(false);
  }

  useEffect(() => {
      fetchPosts();
  }, []);

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
        {isPostLoading
            ? <h1>Loading...</h1>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts About JS'/>
        }

    </div>
  );
}

export default App;
