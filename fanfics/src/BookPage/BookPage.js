import React, {useEffect} from "react";
import './BookPage.css'
import ReactMarkdown from 'react-markdown';
import MainHeader from '../MainHeader/MainHeader'
import ReactStars from "react-rating-stars-component";
import Comment from "../Comment/Comment";
import CommentArea from "../CommentArea/CommentArea"
import {Link, useHistory, useParams} from 'react-router-dom';
import {WithContext as ReactTags} from "react-tag-input";
import like from "../like.png";
import {Provider, LikeButton} from "@lyket/react";
import {addLike, checkIfUsers} from "../global";
import {typeOf} from "uri-js";
import {hideNodesWithUserStatusName} from "../helpers";
import potter from "../potter.jpeg";
import arror from "../arror.png";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {bookSlice, fetchComments, setBookInfo, setBookName, setChapters} from "../store/slices/bookSlice";
import {chapterSlice, setChapterName, setChapterText} from "../store/slices/chapterSlice";
import {fetchBookInfo, fetchChapters} from "../store/slices/bookSlice"
import {store} from "../store/store";
import {BookCard} from "../BookCard/BookCard";

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

    return (
        // <div></div>
        <div style={{'width': '100%'}}>
            <BookCard bookInfo={bookInfo}/>
            <div className="book-contents">
                {
                    bookInfo.chapters.map(ch => {
                        return (
                            <li className="book-contents__item" key={ch.id}
                                onClick={
                                    () => {
                                        dispatch(setChapterName(ch.name))
                                        // console.log(chapterInfo.chapterName)
                                        dispatch(setChapterText(ch.text))
                                        // const chapterName = store.getState().chapter.chapterName
                                        history.push("/chapterPage/" + ch.id);
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
                <Comment></Comment>
                <div className="existing-comments">
                    {
                       comments.map(tag => {
                            return (
                                <CommentArea name="name" text="agsddhas ashdjgashdas asjdhaksjd asjdkasjdh asdjahskjdak"></CommentArea>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );


}

// <div>
//                                         <div className="work-card">
//                                         <h3 className="work-card__header">Рпорпофыв фыовпро фывро</h3>
//                                         <div style={{'display': 'flex', 'flsex-direction': 'row'}}>
//                                             <img className="work-card__poster" src={potter}/>
//                                             <div className="work-card__information">
//                                                 <span className="work-card__line">
//                                                 <dt>Fandom</dt>
//                                                 <dd>agshajs</dd>
//                                             </span>
//                                             <span className="work-card__line">
//                                                 <dt>Fandom</dt>
//                                                 <dd>agshajs</dd>
//                                             </span>
//                                             <span className="work-card__line">
//                                                 <dt>Fandom</dt>
//                                                 <dd>agshajs</dd>
//                                             </span>
//                                             <span className="work-card__line">
//                                                 <dt>Fandom</dt>
//                                                 <div>
//                                                     <label className="work-card__tag">tag</label>
//                                                     <label className="work-card__tag">tag</label>
//                                                     <label className="work-card__tag">tag</label>
//                                                     <label className="work-card__tag">tag</label>
//                                                 </div>
//                                             </span>
//                                             </div>
//                                         </div>
//                                         </div>
// class  BookPage extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             header:localStorage.getItem('curBook') ,
//             topic: '',
//             chaptersList: [],
//             chaptersNames: '',
//             comments: [] ,
//             tags: [{text:'book'} , {text:'fun'}] ,
//             description: '',
//             userRating: ''
//         };
//     }
//
//     componentDidMount() {
//         fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({book_name: this.state.header})
//         }).then((response) => response.json()).then((res) => {
//             console.log(res)
//             this.setState({chaptersList:res})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/getBookTags",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({book_name: this.state.header})
//         }).then((response) => response.json()).then((res) => {
//             const tags = res.map(tag => {
//                 return {
//                     id: tag.tag ,
//                     text: tag.tag
//                 }
//             })
//             this.setState({tags:tags})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/getBookProps",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({book_name: this.state.header})
//         }).then((response) => response.json()).then((res) => {
//             this.setState({topic:res.topic})
//             this.setState({description: res.description})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/getUserRating",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json',  'Auth' : localStorage.getItem('jwt')},
//             body: JSON.stringify({book_name: this.state.header , user: localStorage.getItem('curUser')})
//         }).then((response) => response.json()).then((res) => {
//             this.setState({userRating: res.rating})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/getLike",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
//             body: JSON.stringify({book_name: localStorage.getItem('curBook')})
//         }).then((response) => response.json()).then((likes) => {
//             console.log(likes)
//             this.setState({likes : likes.likes})
//         })
//         this.updateComments()
//         this.intervalId = setInterval(this.updateComments.bind(this) , 2000)
//     }
//
//     updateComments = ()=> {
//         fetch("https://fanfics-pola.herokuapp.com/loadComments", {
//             method: 'POST',
//             headers: {'Content-Type': 'application/json',  'Auth' : localStorage.getItem('jwt')},
//             body: JSON.stringify({book_name: localStorage.getItem('curBook')})
//         }).then((response) => response.json()).then(res => {
//             console.log(res)
//             this.setState({comments: res})
//         })
//     }
//
//     componentWillUnmount() {
//         clearInterval(this.intervalId)
//     }
//
//     changeRating = {
//         onChange : newRating => {
//             fetch("https://fanfics-pola.herokuapp.com/setRating", {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
//                 body: JSON.stringify({user_rating: newRating , book_name: this.state.header})
//             }).then((response) => response.json()).then(res => {
//                 console.log(newRating)
//                 console.log(res)
//             })
//         }
//     }
//
//     render() {
//         const renderLikeImage = () => {
//             if(localStorage.getItem('jwt')!="") {
//                 return <> {
//                     <button className="like-button"
//                             onClick = {()=> {
//                                 window.location = "/user"
//                             }}>
//                         <img className="like-image" src = {like} alt = "like"></img>
//                     </button>
//                 }
//                 </>
//             }
//         }
//
//         const renderComments = () => {
//             if(localStorage.getItem('jwt')!=""){
//                 return <>
//                         <label>Комментарии:</label>
//                     {this.state.comments.map(comment =>
//                             <React.Fragment>
//                                 <CommentArea text = {comment.comment_text} username = {comment.username}></CommentArea>
//                             </React.Fragment>
//                         )}
//                 </>
//             }
//         }
//
//         const renderChapters = () => {
//             return <>
//                 {
//                     this.state.chaptersList.map(chapter =>
//                         <React.Fragment>
//                                     <li className="chapter-link">
//                                         <Link className = "h5" to = "/chapterPage"
//                                               onClick = {() =>
//                                               {localStorage.setItem('curChapter' ,chapter.chapter_name)}}>
//                                             {chapter.chapter_name}</Link>
//                                     </li>
//                         </React.Fragment>
//                     )}
//             </>
//         }
//
//         const renderComment = () => {
//             if(localStorage.getItem('jwt')!="") {
//                 return <>{
//                     <Comment book = {this.state.header}></Comment>
//                 }
//                 </>
//             }
//         }
//
//         const renderTags = () => {
//             return <>
//                 {
//                     this.state.tags.map(tag =>
//                         <React.Fragment>
//                             <button disabled="true" className="btn tag-button text-center">{tag.text}</button>
//                         </React.Fragment>
//                     )}
//             </>
//         }
//
//         const renderRatingBox = () => {
//                 if(localStorage.getItem('jwt')!="") {
//                     return <> {
//                         <div className = "rating-box">
//                             <div className="box">
//                                 <strong className="rating-text">Поставьте лайк:</strong>
//                                 <LikeButton
//                                     className = "like-button"
//                                     namespace="post"
//                                     id={this.state.likes}
//                                     component={LikeButton.templates.Twitter}
//                                     hideCounterIfLessThan={50000}
//                                     onPress = {data=> {
//                                         addLike(this.state.header , data.attributes.userHasLiked)
//                                     }}
//                                 />
//                                 <strong className="rating-text">Лайков: {this.state.likes}</strong>
//                             </div>
//                             <div className="box">
//                                 <strong className="rating-text">Оставьте рейтинг: </strong>
//                                 <ReactStars value = {this.state.userRating} {...this.changeRating} class = "stars"  size={20} activeColor = "#b76a47"/>
//                             </div>
//                         </div>
//                     }
//                     </>
//                 }
//          }
//
//         return (
//             <div className="background">
//                 <MainHeader></MainHeader>
//                 <div className="card-box">
//                     <div className="card book">
//                         <div className="content">
//                             <div className="card-header book-header">
//                                 <p className = "name-book h5">{this.state.header}</p>
//                                 <p className="h5">Жанр : {this.state.topic} </p>
//                             </div>
//                             <div className="card-header">
//                                 <div className="tags">
//                                     <label>Метки:</label>
//                                     <div className = "tags-mg">
//                                         {renderTags()}
//                                     </div>
//                                 </div>
//                                     <label>Описание:</label>
//                                     <i>
//                                         {this.state.description}
//                                     </i>
//                             </div>
//                             <div className="card-body">
//                                 <div>
//                                     <ol>
//                                         {renderChapters()}
//                                     </ol>
//                                 </div>
//                             </div>
//                         </div>
//                         {renderRatingBox()}
//                         {renderComment()}
//                         <div className="form-outline border-top border-bottom">
//                             {renderComments()}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
//
//
// }

export default BookPage;