import React from "react";
import './CreateChapters.css'
import MainHeader from "../MainHeader/MainHeader";
import {addChapter} from "../global"
import {getCreatingBook} from "../global"
import {switchTheme} from "../App";
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

class CreateChapters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book : '' ,
            name :'' ,
            text: ''
        }
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
    }

    setTextChapter = (text) => {
        console.log(text)
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
                                       this.setState({'name': event.target.value})
                                   }}/>
                            <label>Текст главы:</label>
                            <div className="Editor">
                                <ReactMde
                                    onChange={this.setTextChapter}
                                    minEditorHeight = {300}
                                />
                            </div>

                            <button className="btn btn-outline custom-button send"
                                    onClick = {()=> {
                                        console.log(getCreatingBook())
                                        addChapter(this.state.name , this.state.text , localStorage.getItem('creatingBook'))
                                        addIndex()
                                        window.location = "/user"
                                    }}>Опубликовать</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CreateChapters;