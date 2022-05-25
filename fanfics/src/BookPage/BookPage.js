import React, {useEffect} from "react";
import './BookPage.css'
import Comment from "../Comment/Comment";
import CommentArea from "../CommentArea/CommentArea"
import {Link, useHistory, useParams} from 'react-router-dom';
import like from "../like.png";
import {Provider, LikeButton} from "@lyket/react";
import {addLike, checkIfUsers} from "../global";
import {hideNodesWithUserStatusName} from "../helpers";
import arror from "../arror.png";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {bookSlice, fetchComments, setBookInfo, setBookName, setChapters} from "../store/slices/bookSlice";
import {chapterSlice, setChapterName, setChapterText} from "../store/slices/chapterSlice";
import {fetchBookInfo, fetchChapters} from "../store/slices/bookSlice"
import {store} from "../store/store";
import {BookCard} from "../BookCard/BookCard";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";

const BookPage = () => {
    let {id} = useParams()
    const history = useHistory();
    const dispatch = useDispatch()
    let chapterInfo = useSelector(state => state.chapter)
    let bookInfo = useSelector(state => state.book)
    const comments = useSelector(state => state.book.comments)

    useEffect(() => {
        dispatch(fetchBookInfo(id))
        dispatch(fetchChapters(id))
        dispatch(fetchComments(id))
    }, [])

    setInterval(() => {
        dispatch(fetchComments(id))
    }, 5000)

    return (
        <div style={{'width': '100%'}}>
            <BookCard bookId={id}/>
            <div className="book-contents">
                {
                    bookInfo.chapters.map(ch => {
                        return (
                            <li className="book-contents__item" key={ch.id}
                                onClick={
                                    () => {
                                        dispatch(setChapterName(ch.name))
                                        dispatch(setChapterText(ch.text))
                                        history.push("/chapterPage/"+ bookInfo.book.id + "/" + ch.id);
                                    }
                                }>
                                <div className="part-title word-break">
                                    <h4>{ch.name}</h4>
                                </div>
                                <img src={arror}/>
                            </li>
                        )
                    })
                }
            </div>
            <div className="comments-container">
                {
                    (() => {
                         if(localStorage.getItem('curUser')) {
                             return <Comment bookId={bookInfo.book.id} userId={parseInt(CryptoJS.AES.decrypt(localStorage.getItem('curUser'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8))}></Comment>
                         }
                    })()
                }
                <div className="existing-comments">
                    {
                       comments.map(comment => {
                            return (
                                <CommentArea user={comment.user} name={comment.name} text={comment.text}></CommentArea>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default BookPage;