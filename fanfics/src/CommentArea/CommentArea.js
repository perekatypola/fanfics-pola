import React, {useEffect} from "react";
import './CommentArea.css'
import potter from "../potter.jpeg"
import {Cloudinary} from "@cloudinary/url-gen";
import {fetchUserInfo} from "../store/slices/userSlice";
import {useDispatch, useSelector} from "react-redux";

const Comment = (props) => {
    const dispatch = useDispatch()
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'deixwcl0a'
          }
    });

    const myImage = cld.image(props.user.name).toURL();
        return (
            <div className="comment-area">
                <img className="user-poster comment-poster" src={myImage}/>
                <div className="form-outline border comment">
                    <p className="comment-username">{props.name}</p>
                    <p className="comment-text">{props.text}</p>
                </div>
            </div>
        );
}

export default Comment;