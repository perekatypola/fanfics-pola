import React, {useState} from "react";
import {addComment} from '../global'
import "./Comment.css"
import {useTranslation} from "react-i18next";

const Comment = (props) => {
    const [text, setText] = useState()
    const {t} = useTranslation()

    const commentAddition = () => {
        document.getElementById("comment-text").value = ""
        addComment(props.userId, text , props.bookId)
    }

    const changeText = event => {
        setText(event.target.value)
    }

    return (
            <div className="form-outline comment-box border">
                <label>{t('Comment')}</label>
                <textarea className="form-control comments" rows="4" id = "comment-text"
                          onChange={changeText}/>
                <button className="btn btn-outline custom-button send"
                onClick = {commentAddition}>{t('Send')}</button>
            </div>
        );
}

export default Comment;