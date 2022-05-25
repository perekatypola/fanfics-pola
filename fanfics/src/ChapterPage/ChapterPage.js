import React, {useEffect, useState} from "react";
import './ChapterPage.css'
import {chaptersNav} from '../global'
import MainHeader from '../MainHeader/MainHeader'
import CommentArea from "../CommentArea/CommentArea";
import ReactMarkdown from 'react-markdown'
import {BookCard} from "../BookCard/BookCard";
import potter from "../potter.jpeg";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import {fetchChapter, setChapterName, setChapterText} from "../store/slices/chapterSlice";
import arror from "../arror.png";
import {fetchBookInfo, setBookInfo} from "../store/slices/bookSlice";

const ChapterPage = () => {
    const {bookId, id} = useParams()
    const dispatch = useDispatch()
    const chapterData = useSelector((state) => {
        return state.chapter})

    const history = useHistory();

    useEffect(() => {
        dispatch(fetchChapter(id))
        dispatch(fetchBookInfo(bookId))
    }, [])

    const bookData = useSelector(state => state.book)
        console.log(bookData)

    const navigateRight = () => {

        bookData.chapters.forEach(ch => {
            console.log(ch)
            if(ch.name === chapterData.chapterName && bookData.chapters.indexOf(ch)!= bookData.chapters.length - 1) {
                dispatch(setChapterName(bookData.chapters[bookData.chapters.indexOf(ch)+1].name))
                dispatch(setChapterText(bookData.chapters[bookData.chapters.indexOf(ch)+1].text))
                history.push("/chapterPage/" + bookData.book.id + "/" +bookData.chapters[bookData.chapters.indexOf(ch)+1].id);
            }
        })
    }

    const navigateLeft = () => {
        bookData.chapters.forEach(ch => {
            console.log(bookData)
            if(ch.name === chapterData.chapterName && bookData.chapters.indexOf(ch)!= 0 ) {
                dispatch(setChapterName(bookData.chapters[bookData.chapters.indexOf(ch)-1].name))
                dispatch(setChapterText(bookData.chapters[bookData.chapters.indexOf(ch)-1].text))
                history.push("/chapterPage/" + bookData.book.id + "/" + bookData.chapters[bookData.chapters.indexOf(ch)-1].id);
            }
        })
    }

    const renderButtons = () => {
        return (
            <div className = "buttons">
                <button className="chapter-button__left chapter-button" id = "left"
                        onClick = {() => {navigateLeft()}}>
                    <img src={arror}/>
                    Назад
                </button>
                <button className="chapter-button__contents chapter-button"
                        onClick = {() => {window.location = "/bookPage/" + bookData.book.id} }>Содержание</button>
                <button className="chapter-button__right chapter-button" id = "right"
                        onClick = {() => {navigateRight()}}>
                    Вперед
                    <img src={arror}/>
                </button>
            </div>
        );
    }

    return (
        <div className="ChapterPage">
            <BookCard bookId={bookId}></BookCard>
            <div>
                <div className="chapterWithNav">
                    <div className="chapter">
                        <div className="chapter-content">
                            <div>
                                <div className="card-header text-center">
                                    {renderButtons()}
                                    <h2 className="chapter-name">{chapterData.chapterName}</h2>
                                </div>
                                <div className="card-body">
                                    <ReactMarkdown>{chapterData.text}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-box">
                        {renderButtons()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChapterPage;