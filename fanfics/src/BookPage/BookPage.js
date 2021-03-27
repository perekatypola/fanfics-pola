import React from "react";
import './BookPage.css'
import ReactMarkdown from 'react-markdown';
import MainHeader from '../MainHeader/MainHeader'
import ReactStars from "react-rating-stars-component";
import Comment from "../Comment/Comment";
import CommentArea from "../CommentArea/CommentArea"
import {Link} from 'react-router-dom';
import {WithContext as ReactTags} from "react-tag-input";
import like from "../like.png";
import { Provider, LikeButton } from "@lyket/react";
import {addLike, checkIfUsers} from "../global";
import {switchTheme} from "../App";
class  BookPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            header:localStorage.getItem('curBook') ,
            topic: '',
            chaptersList: [],
            chaptersNames: '',
            comments: [] ,
            tags: [{text:'book'} , {text:'fun'}] ,
            description: ''
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({book_name: this.state.header})
        }).then((response) => response.json()).then((res) => {
            console.log(res)
            this.setState({chaptersList:res})
        })
        fetch("https://fanfics-pola.herokuapp.com/getBookTags",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({book_name: this.state.header})
        }).then((response) => response.json()).then((res) => {
            const tags = res.map(tag => {
                return {
                    id: tag.tag ,
                    text: tag.tag
                }
            })
            this.setState({tags:tags})
        })
        fetch("https://fanfics-pola.herokuapp.com/getBookProps",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({book_name: this.state.header})
        }).then((response) => response.json()).then((res) => {
            this.setState({topic:res.topic})
            this.setState({description: res.description})
        })
        fetch("https://fanfics-pola.herokuapp.com/getLike",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
            body: JSON.stringify({book_name: localStorage.getItem('curBook')})
        }).then((response) => response.json()).then((likes) => {
            console.log(likes)
            this.setState({likes : likes.likes})
        })
        this.updateComments()
        this.intervalId = setInterval(this.updateComments.bind(this) , 2000)
    }

    updateComments = ()=> {
        fetch("https://fanfics-pola.herokuapp.com/loadComments", {
            method: 'POST',
            headers: {'Content-Type': 'application/json',  'Auth' : localStorage.getItem('jwt')},
            body: JSON.stringify({book_name: localStorage.getItem('curBook')})
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({comments: res})
        })
    }



    componentWillUnmount() {
        clearInterval(this.intervalId)
    }

    changeRating = {
        onChange : newRating => {
            fetch("https://fanfics-pola.herokuapp.com/setRating", {
                method: 'POST',
                headers: {'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
                body: JSON.stringify({user_rating: newRating , book_name: this.state.header})
            }).then((response) => response.json()).then(res => {
                console.log(newRating)
                console.log(res)
            })
        }
    }

    render() {
        const renderLikeImage = () => {
            if(localStorage.getItem('jwt')!="") {
                return <> {
                    <button className="like-button"
                            onClick = {()=> {
                                window.location = "/user"
                            }}>
                        <img className="like-image" src = {like} alt = "like"></img>
                    </button>
                }
                </>
            }
        }

        const renderComments = () => {
            if(localStorage.getItem('jwt')!=""){
                return <>
                        <label>Комментарии:</label>
                    {this.state.comments.map(comment =>
                            <React.Fragment>
                                <CommentArea text = {comment.comment_text} username = {comment.username}></CommentArea>
                            </React.Fragment>
                        )}
                </>
            }
        }

        const renderChapters = () => {
            return <>
                {
                    this.state.chaptersList.map(chapter =>
                        <React.Fragment>
                                    <li className="chapter-link">
                                        <Link className = "h5" to = "/chapterPage"
                                              onClick = {() =>
                                              {localStorage.setItem('curChapter' ,chapter.chapter_name)}}>
                                            {chapter.chapter_name}</Link>
                                    </li>
                        </React.Fragment>
                    )}
            </>
        }

        const renderComment = () => {
            if(localStorage.getItem('jwt')!="") {
                return <>{
                    <Comment book = {this.state.header}></Comment>
                }
                </>
            }
        }

        const renderTags = () => {
            return <>
                {
                    this.state.tags.map(tag =>
                        <React.Fragment>
                            <button disabled="true" className="btn tag-button text-center">{tag.text}</button>
                        </React.Fragment>
                    )}
            </>
        }

        const renderRatingBox = () => {
                if(localStorage.getItem('jwt')!="") {
                    return <> {
                        <div className = "rating-box">
                            <div className="box">
                                <strong className="rating-text">Поставьте лайк:</strong>
                                <LikeButton
                                    className = "like-button"
                                    namespace="post"
                                    id={this.state.likes}
                                    component={LikeButton.templates.Twitter}
                                    hideCounterIfLessThan={50000}
                                    onPress = {data=> {
                                        addLike(this.state.header , data.attributes.userHasLiked)
                                    }}
                                />
                                <strong className="rating-text">Лайков: {this.state.likes}</strong>
                            </div>
                            <div className="box">
                                <strong className="rating-text">Оставьте рейтинг: </strong>
                                <ReactStars {...this.changeRating} class = "stars" size={20} activeColor = "#b76a47"/>
                            </div>
                        </div>
                    }
                    </>
                }
         }

        return (
            <div className="background">
                <MainHeader></MainHeader>
                <div className="card-box">
                    <div className="card book">
                        <div className="content">
                            <div className="card-header book-header">
                                <p className = "name-book h5">{this.state.header}</p>
                                <p className="h5">Жанр : {this.state.topic} </p>
                            </div>
                            <div className="card-header">
                                <div className="tags">
                                    <label>Метки:</label>
                                    <div className = "tags-mg">
                                        {renderTags()}
                                    </div>
                                </div>
                                    <label>Описание:</label>
                                    <i>
                                        {this.state.description}
                                    </i>
                            </div>
                            <div className="card-body">
                                <div>
                                    <ol>
                                        {renderChapters()}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {renderRatingBox()}
                        {renderComment()}
                        <div className="form-outline border-top border-bottom">
                            {renderComments()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default BookPage;