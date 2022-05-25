import React, {useState} from "react";
import './CreateChapters.css'
import {addChapter} from "../global"
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

const CreateChapters = (props) => {
    const [name, setName] = useState('')
    const [text, setChapterText] = useState('')
    return (
            <div className="book__creation">
                <h3>Создание главы</h3>
                <div className="settings-container">
                    <div className="settings-info__row">
                        <strong>Название главы:</strong>
                        <input onChange={event => {
                            setName(event.target.value)
                        }}/>
                    </div>
                    <div className="settings-info__row">
                        <strong>Текст главы:</strong>
                        <ReactMde
                            onChange={setChapterText}
                            minEditorHeight = {300}
                        />
                    </div>
                </div>
                 <button className="btn btn-outline custom-button send"
                                    onClick = {()=> {
                                        addChapter(name , text , props.bookId)
                                        window.location = "/user" + "1"
                                    }}>Опубликовать</button>
            </div>

        );
}

export default CreateChapters;