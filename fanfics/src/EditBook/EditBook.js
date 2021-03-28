import React from "react";
import ReactMarkdown from 'react-markdown';
import MainHeader from '../MainHeader/MainHeader'
import {Link} from 'react-router-dom';
import './EditBook.css'
import {editBook} from '../global'
import {switchTheme} from "../App";
import edit from "../edit.png";
import add from "../add.png";
import {WithContext as ReactTags} from "react-tag-input";
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
class  EditBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            header:localStorage.getItem('curBook') ,
            topic: 'Романтика',
            chaptersList: [{chapter_name: 'First'} , {chapter_name : 'Second'} , {chapter_name : 'Second'},{chapter_name : 'Second'},{chapter_name : 'Second'},{chapter_name : 'Second'}],
            chaptersNames: '',
            curTags:[],
            suggestions :[],
            tags: [] ,
            newTitle:'',
            newDescr: '',
            description:'' ,
            topics:[] ,
            newTopic: ''
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
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
        fetch("https://fanfics-pola.herokuapp.com/loadTopics", {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Auth' : localStorage.getItem('jwt')}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({topics: res})
        })
        fetch("https://fanfics-pola.herokuapp.com/getBookProps",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({book_name: this.state.header})
        }).then((response) => response.json()).then((res) => {
            this.setState({topic:res.topic})
            this.setState({description: res.description})
        })
        fetch("https://fanfics-pola.herokuapp.com/loadTags", {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Auth' : localStorage.getItem('jwt')}
        }).then((response) => response.json()).then(res => {
            this.setState({tags: res})
            const suggestions = this.state.tags.map(tag => {
                return {
                    id: tag.tag ,
                    text: tag.tag
                }
            })
            this.setState({suggestions: suggestions})
        })
        this.setState({newDescr: this.state.description})
        this.setState({newTitle: this.state.header})
        this.setState({newTopic: this.state.topic})
    }

    handleAddition(tag) {
        this.state.curTags.push(tag)
        console.log(this.state.curTags)
    }

    handleDelete(i) {
        const { curTags } = this.state;
        this.setState({
            curTags: curTags.filter((tag, index) => index !== i),
        });
    }

    render() {

        const renderChapters = () => {
            return <>
                {
                    this.state.chaptersList.map(chapter =>
                        <React.Fragment>
                            <li className="chapter-link">
                                <Link className = "h5">
                                    {chapter.chapter_name}</Link>
                                <button className = "user-button"  onClick = {() =>
                                {
                                    localStorage.setItem('curChapter' , chapter.chapter_name)
                                    window.location = "/editChapter"
                                }
                                }>
                                    <img className = "edit-button" src = {edit} alt = "edit" ></img>
                                </button>
                            </li>
                        </React.Fragment>
                    )}
            </>
        }

        const renderTopics = () => {
            return <>
                {
                    this.state.topics.map(topic =>
                        <button className="dropdown-item" type = "button"
                                onClick={()=> {
                                    this.setState({newTopic : topic.topic})
                                }}>{topic.topic}</button>
                    )}
            </>
        }

        return (
            <div className="background EditBook">
                <MainHeader></MainHeader>
                <div className="card-box">
                    <div className="card book">
                        <div className="content">
                            <div className="card-header book-header edit-book-header">
                                <div>
                                    <input className = "name-book h5" defaultValue ={this.state.header} onChange = {event =>{
                                            this.setState({newTitle : event.target.value})
                                    }}></input>
                                </div>
                                <div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Жанр:
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {renderTopics()}
                                    </div>
                                </div>
                            </div>
                            <div className="card-header">
                                    <label>Метки:</label>
                                    <ReactTags className = "tags" tags={this.state.curTags}
                                               suggestions={this.state.suggestions}
                                               handleDelete={this.handleDelete}
                                               handleAddition={this.handleAddition}
                                               handleDrag={this.handleDrag}
                                               delimiters={delimiters} />
                                <label>Описание:</label>
                                <textarea className="form-control" rows="4" onChange = {event =>{
                                        this.setState({newDescr : event.target.value})
                                }} defaultValue = {this.state.description}></textarea>
                            </div>
                            <div className="card-body">
                                <div>
                                    <ol>
                                        {renderChapters()}
                                        <li>
                                            <button className = "user-button">
                                                <img className = "edit-button" src = {add} alt = "add" ></img>
                                            </button>
                                        </li>
                                    </ol>
                                </div>
                            </div>
                            <button className = "save-button btn custom-button" onClick ={() => {
                                editBook(this.state.newTitle , this.state.newDescr , this.state.curTags , this.state.header ,this.state.suggestions , this.state.newTopic)
                            }}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


}

export default EditBook;