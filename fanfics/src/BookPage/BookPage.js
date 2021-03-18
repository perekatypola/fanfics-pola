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
import {addLike} from "../global";
class  BookPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            header:localStorage.getItem('curBook') ,
            topic: "Fiction",
            chaptersList: [],
            chaptersNames: '',
            comments: [] ,
            tags: [] ,
            likes : 0
        };
    }

    componentDidMount() {
        fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'bookName' : this.state.header}
        }).then((response) => response.json()).then((res) => {
            console.log(res)
            this.setState({chaptersList:res})
        })
        fetch("https://fanfics-pola.herokuapp.com/getBookTags",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'bookName' : this.state.header}
        }).then((response) => response.json()).then((res) => {
            console.log(res)
            const tags = res.map(tag => {
                return {
                    id: tag.tag ,
                    text: tag.tag
                }
            })
            this.setState({tags:tags})
        })
        fetch("https://fanfics-pola.herokuapp.com/getLike",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'bookName' : this.state.header , 'Auth' : localStorage.getItem('jwt')}
        }).then((response) => response.json()).then((likes) => {
            console.log(likes)
            this.setState({likes : likes.likes})
        })
        this.updateComments()
        this.intervalId = setInterval(this.updateComments.bind(this) , 2000)
    }

    updateComments = ()=> {
        fetch("https://fanfics-pola.herokuapp.com/loadComments", {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'bookName': this.state.header , 'Auth' : localStorage.getItem('jwt')}
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
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'book_name': this.state.header , 'Auth' : localStorage.getItem('jwt') , 'user_rating': newRating}
            }).then((response) => response.json()).then(res => {
                console.log(res)
            })
            console.log(newRating)
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
                                    <li>
                                        <Link to = "/chapterPage"
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

        return (
            <div className="background">
                <MainHeader></MainHeader>
                <div className="card-box">
                    <div className="card book">
                        <div className="content">
                            <div className="card-header">
                                <p className="h5">{this.state.header}</p>
                                <p className="h5">Topic : {this.state.topic} </p>
                            </div>
                            <div className="card-body">
                                <ol>
                                    {renderChapters()}
                                </ol>
                            </div>
                        </div>
                        <div className = "rating-box">
                            <div className="box">
                                <strong>Поставьте лайк:</strong>
                                <LikeButton
                                    className = "like-button"
                                    namespace="post"
                                    id={this.state.header}
                                    component={LikeButton.templates.Twitter}
                                    hideCounterIfLessThan={50000}
                                    onPress = {data=> {
                                        addLike(this.state.header , data.attributes.userHasLiked)
                                    }}
                                />
                                <strong>Лайков: {this.state.likes}</strong>
                            </div>
                            <ReactTags className = "tags"
                                       tags={this.state.tags}/>
                            <div className="box">
                                <strong>Оставьте рейтинг: </strong>
                                <ReactStars {...this.changeRating} class = "stars" size={20} activeColor = "#b76a47"/>
                            </div>
                        </div>
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