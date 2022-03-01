import React from 'react';
import MyButton from "../UI/button/MyButton";
import './PostItem.css';
import {useNavigate} from "react-router-dom";

const PostItem = (props) => {
    let navigate = useNavigate();

    return (
        <div className="post">
            <div className="post-content">
                <strong>{props.post.id}. {props.post.title}</strong>
                <div>{props.post.body}</div>
            </div>
            <div className="post-buttons">
                <MyButton onClick={() => navigate(`/posts/${props.post.id}`)}>Open</MyButton>
                <MyButton className="delete-btn" onClick={() => props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default PostItem;