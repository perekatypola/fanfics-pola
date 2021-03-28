import React from "react";
import './CreateBook.css'
import MainHeader from "../MainHeader/MainHeader";
import {addInitialBook, setCreatingBook} from '../global'
import {WithContext as ReactTags} from "react-tag-input";
import {switchTheme} from "../App";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class CreateBook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '' ,
            descr:'',
            topics:[] ,
            curTags:[],
            tags: [],
            suggestions: [] ,
            chosenTopic : ''
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadTopics", {
            method: 'GET',
            headers: {'Content-Type': 'application/json','Auth' : localStorage.getItem('jwt')}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({topics: res})
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
        const { curTags, suggestions } = this.state;

        const renderTopics = () => {
            return <>
                {
                    this.state.topics.map(topic =>
                        <button className="dropdown-item" type = "button"
                                onClick={()=> {
                                    this.setState({chosenTopic : topic.topic})
                                }}>{topic.topic}</button>
                    )}
            </>
        }

        return (
            <div className="background">
                <MainHeader></MainHeader>
                <form id="form">
                    <p className="display-4 text-center">Ваша новая работа:</p>
                    <div className="cont p-4 my-3 border">
                        <div className="form-group">
                            <div className = "tags-and-topics-books">
                                <div className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Жанр:
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        {renderTopics()}
                                    </div>
                                </div>
                                <ReactTags className = "tags" tags={curTags}
                                           suggestions={suggestions}
                                           handleDelete={this.handleDelete}
                                           handleAddition={this.handleAddition}
                                           handleDrag={this.handleDrag}
                                           delimiters={delimiters} />
                            </div>
                            <label htmlFor="inputUsername">Название:</label>
                            <input initialValue="" type="name" className="form-control book-name" placeholder="Фанфик"
                            onChange = {event => {this.setState({name:event.target.value})}}/>
                            <label htmlFor="inputUsername">Описание:</label>
                            <textarea className="form-control" rows="4"
                                      onChange = {event => {this.setState({descr:event.target.value})}}> </textarea>
                            <div className="button-box">
                                <button type="button" className="btn btn-outline custom-button sign-in"
                                        onClick = {() => {
                                             window.location = "/createChapters"
                                            localStorage.setItem('creatingBook' , this.state.name)
                                            addInitialBook(this.state.name , this.state.descr ,this.state.chosenTopic , this.state.suggestions ,this.state.curTags,localStorage.getItem('curUser'))}}>Продолжить</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateBook;