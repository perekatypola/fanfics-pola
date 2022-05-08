import React, {useState} from "react";
import {addComment} from '../global'
import "./Comment.css"
import {CLIENT_SECRET} from "../config";
import * as CryptoJS from "crypto-js";

const Comment = (props) => {
    const [text, setText] = useState()
    console.log(props)

    return (
            <div className="form-outline comment-box border">
                <label>Комментарий:</label>
                <textarea className="form-control comments" rows="4" id = "comment-text"
                          onChange={event=>{
                              setText(event.target.value)
                          }}> </textarea>
                <button className="btn btn-outline custom-button send"
                onClick = {()=> {
                    document.getElementById("comment-text").value = ""
                        addComment(props.userId, text , props.bookId)
                }}>Отправить</button>
            </div>
        );
}

export default Comment;