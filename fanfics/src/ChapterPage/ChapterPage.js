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
    const chapterData = useSelector((state) => {console.log(state)
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
        // this.state.chapters.forEach(ch => {
        //     if(ch.chapter_name === this.state.chapterName && this.state.chapters.indexOf(ch)!= 0) {
        //         this.setState({chapter:this.state.chapters[this.state.chapters.indexOf(ch)-1]})
        //         this.setState({chapterName:this.state.chapter.chapter_name})
        //         this.setState({text : this.state.chapter.text})
        //     }
        // })
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
            <BookCard></BookCard>
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

// class  ChapterPage extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             book: localStorage.getItem('curBook'),
//             chapterName:localStorage.getItem('curChapter'),
//             chapter: {},
//             text:'',
//             chapters :[]
//         };
//     }
//
//     componentDidMount() {
//         fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({book_name: this.state.book})
//         }).then((response) => response.json()).then((res) => {
//             console.log(res)
//             this.setState({chapters:res})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/loadChapter",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({chapterName : this.state.chapterName, bookName : this.state.book})
//         }).then((response) => response.json()).then(ch => {
//                     this.setState({chapter:ch})
//                     this.setState({text:ch.text})
//         })
//     }
//
//     render() {
//         const navigateRight = () => {
//             console.log("right")
//             this.state.chapters.forEach(ch => {
//                 if(ch.chapter_name === this.state.chapterName && this.state.chapters.indexOf(ch)!= this.state.chapters.length - 1) {
//                     this.setState({chapter:this.state.chapters[this.state.chapters.indexOf(ch)+1]})
//                     this.setState({chapterName:this.state.chapter.chapter_name})
//                     this.setState({text : this.state.chapter.text})
//                 }
//             })
//         }
//
//         const navigateLeft = () => {
//             console.log("left")
//             this.state.chapters.forEach(ch => {
//                 if(ch.chapter_name === this.state.chapterName && this.state.chapters.indexOf(ch)!= 0) {
//                     this.setState({chapter:this.state.chapters[this.state.chapters.indexOf(ch)-1]})
//                     this.setState({chapterName:this.state.chapter.chapter_name})
//                     this.setState({text : this.state.chapter.text})
//                 }
//             })
//         }
//
//         return (
//             <div className="background">
//                 <MainHeader></MainHeader>
//                 <div className = "buttons">
//                     {/*{drawNavButtons()}*/}
//                     <button className="btn btn-outline custom-button content-button" id = "left"
//                             onClick = {() => {navigateLeft()}}>Назад</button>
//                     <button className="btn btn-outline custom-button content-button"
//                             onClick = {() => {window.location = "/bookPage"}}>Содержание</button>
//                     <button className="btn btn-outline custom-button content-button" id = "right"
//                             onClick = {() => {navigateRight()}}>Вперед</button>
//                 </div>
//                 <div className="chapterWithNav">
//                     <div className="chapter">
//                         <div className="chapter-content">
//                             <div>
//                                 <div className="card-header text-center">
//                                     <p className="h5">{this.state.chapterName}</p>
//                                 </div>
//                                 <div className="card-body">
//                                     <ReactMarkdown>{this.state.text}</ReactMarkdown>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="button-box">
//                         <div className = "buttons">
//                             <button className="btn btn-outline custom-button content-button" id = "left"
//                                     onClick = {() => {navigateLeft()}}>Назад</button>
//                             <button className="btn btn-outline custom-button content-button"
//                                     onClick = {() => {window.location = "/bookPage"}}>Содержание</button>
//                             <button className="btn btn-outline custom-button content-button" id = "right"
//                                     onClick = {() => {navigateRight()}}>Вперед</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

export default ChapterPage;