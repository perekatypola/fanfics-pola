import React, {useEffect, useState} from "react";
import './EditChapter.css'
import {addChapter, editBook, editChapter} from "../global"
import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchChapter} from "../store/slices/chapterSlice";

const EditChapter = (props) => {
    const {id} = useParams()
    const chapter = useSelector(state => state.chapter.chapter)
    const [name, setName] = useState('')
    const [text, setChapterText] = useState(chapter.text)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchChapter(id))
    }, [])

    return (
            <div className="book__creation">
                <h3>Редактирование главы</h3>
                <div className="settings-container">
                    <div className="settings-info__row">
                        <strong>Название главы:</strong>
                        <input defaultValue={chapter.name} onChange={event => {
                            setName(event.target.value)
                        }}/>
                    </div>
                    <div className="settings-info__row">
                        <strong>Текст главы:</strong>
                        <ReactMde
                            value={text}
                            onChange={setChapterText}
                            minEditorHeight = {300}
                        />
                    </div>
                    <button className="btn btn-outline custom-button send"
                            onClick = {()=> {
                                editChapter(localStorage.getItem("curUser"), chapter.id, name , text)
                            }}>Сохранить</button>
                </div>
            </div>

        );
}


export default EditChapter;