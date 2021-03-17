import React from "react";
import './CreateChapters.css'
import MainHeader from "../MainHeader/MainHeader";
import {addChapter} from "../global"
import {getCreatingBook} from "../global"
const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

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
    }

    render() {
        return (
            <div className="background">
                <MainHeader></MainHeader>
                <p></p>
                <p></p>
                <div className = "create-book">
                    <div className="card">
                        <div className="form-outline comment-box">
                            <label>Название главы:</label>
                            <input className="name form-control"
                                   onChange={event=>{
                                       this.setState({'name': event.target.value})
                                   }}/>
                            <label>Текст главы:</label>
                            <textarea className="form-control comments" rows="12"
                                      onChange={event=>{
                                          this.setState({'text': event.target.value})
                                      }}> </textarea>
                            <button className="btn btn-outline custom-button send"
                                    onClick = {()=> {
                                        console.log(getCreatingBook())
                                        addChapter(this.state.name , this.state.text , localStorage.getItem('creatingBook'))
                                    }}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default CreateChapters;