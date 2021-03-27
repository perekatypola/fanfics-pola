import React from "react";
import './EditChapter.css'
import MainHeader from "../MainHeader/MainHeader";
import {addChapter, editBook, editChapter} from "../global"
import {getCreatingBook} from "../global"
import {switchTheme} from "../App";
import ReactMde from "react-mde";
import ReactMarkdown from 'react-markdown'
import "react-mde/lib/styles/css/react-mde-all.css";

class EditChapter extends React.Component {


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
        fetch("https://fanfics-pola.herokuapp.com/loadChapter",  {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({chapterName : this.state.chapterName, bookName : this.state.book})
        }).then((response) => response.json()).then(ch => {
            this.setState({chapter:ch})
            this.setState({text:ch.text})
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
                <p></p>
                <p></p>
                <div className = "create-book">
                    <div className="create-chapter card">
                        <div className="form-outline comment-box">
                            <label>Название главы:</label>
                            <input className="chapter-name form-control"
                                   onChange={event=>{
                                       this.setState({'newName': event.target.value})
                                   }}
                                   defaultValue={this.state.chapterName}
                            />
                            <label>Текст главы:</label>
                            <div className="Editor">
                                <ReactMde
                                    value={this.state.text}
                                    onChange={this.setTextChapter}
                                    minEditorHeight = {300}
                                    generateMarkdownPreview={(markdown) =>
                                        Promise.resolve(<ReactMarkdown source={markdown} />)
                                    }
                                />
                            </div>
                            <button className = "save-button btn custom-button" onClick ={() => {
                                editChapter(this.state.newName , this.state.text , this.state.book ,this.state.chapterName)
                            }}>Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default EditChapter;