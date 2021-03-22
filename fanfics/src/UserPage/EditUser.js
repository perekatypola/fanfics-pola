import React from "react";
import MainHeader from "../MainHeader/MainHeader";
import {addChapter, editBook, editChapter} from "../global"
import {switchTheme} from "../App";
import ReactMde from "react-mde";
import ReactMarkdown from 'react-markdown'
import "react-mde/lib/styles/css/react-mde-all.css";
import edit from "../edit.png";

class EditUser extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            book : localStorage.getItem('curBook') ,
            chapterName: localStorage.getItem('curChapter'),
            text: '',
            newName: '',
        }
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'chapterName' : this.state.chapterName, 'bookName' : this.state.book}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            res.forEach(ch => {
                if(ch.chapter_name === this.state.chapterName) {
                    this.setState({text:ch.text})
                }
            })
            console.log(res)
        })
        console.log(this.state)
    }

    setTextChapter = (text) => {
        this.setState({text: text})
    }

    render() {
        return (
            <div className="background">
                <MainHeader></MainHeader>
                <div className = "user-profile">
                    <div className="card">
                        <div className = "card-header">
                            <div>
                                <p className="h2">
                                    Пользователь:
                                </p>
                                <p className="h3">{localStorage.getItem('curUser')}</p>
                            </div>
                            <button className = "user-button"  onClick = {() =>
                            {
                                window.location = "/editUser"
                            }
                            }>
                                <img className = "edit-button" src = {edit} alt = "edit" ></img>
                            </button>
                        </div>
                        <div className = "card-body">
                            <p className="h3">
                                O себе:
                            </p>
                            <p>
                                ООООО
                            </p>
                            <p className="h3">
                                Контактная информация:
                            </p>
                            <p>
                                ООООО
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditUser;