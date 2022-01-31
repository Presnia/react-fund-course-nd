import {useEffect, useState} from "react";
import PostList from "./components/PostList/PostList";
import PostForm from "./components/PostForm/PostForm";
import PostFilter from "./components/PostFilter/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./hooks/useFetching";
import './App.css';
import {getPageCount, getPagesArray} from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
      const response = await PostService.getAllPosts(limit, page);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count'];
      setTotalPages(getPageCount(totalCount, limit));
  });

  useEffect(() => {
      fetchPosts().then();
  }, [page]);

  const createPost = (newPost) => {
      setPosts([...posts, newPost]);
      setModal(false);
  }

  const removePost = (post) => {
      setPosts(posts.filter(p => p.id !== post.id));
  }

  const changePage = (page) => {
      setPage(page);
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
        {
            postError &&
            <h1>Error: ${postError}</h1>
        }
        {isPostLoading
            ? <Loader/>
            : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts About JS'/>
        }
        <Pagination
            page={page}
            changePage={changePage}
            totalPages={totalPages}
        />
    </div>
  );
}

export default App;
