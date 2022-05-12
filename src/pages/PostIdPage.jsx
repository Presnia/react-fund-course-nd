import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import "./PostIdPage.css";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    });

    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostById(params.id).then();
        fetchComments(params.id).then();
    }, []);

    return (
        <div>
            <h2>You have opened the post page with ID {params.id}</h2>
            {isLoading
                ? <Loader/>
                : <div className="title-id">{post.id}. {post.title}</div>
            }
            <h2>Comments</h2>
            {isComLoading
                ? <Loader/>
                : <div className="comments-page">
                    {comments.map(comm =>
                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <p>{comm.body}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;