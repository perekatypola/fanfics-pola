import React, {useEffect, useRef, useState} from "react";
import './CreateBook.css'
import MainHeader from "../MainHeader/MainHeader";
import {addInitialBook, setCreatingBook} from '../global'
import ReactTagInput from "@pathofdev/react-tag-input";
import ReactTags from 'react-tag-autocomplete'
import "@pathofdev/react-tag-input/build/index.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFandoms, fetchGenres, fetchTags} from "../store/slices/mainSlice";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";
import Upload from "../Upload/Upload";
import {useTranslation} from "react-i18next";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const CreateBook = () => {
    const categories = useSelector(state => state.main.categories)
    const genres = useSelector(state => state.main.genres)
    const fandoms = useSelector(state => state.main.fandoms)
    const [curTags, setTags] = useState([])

    const [descr, setDescr] = useState('')
    const [name, setName] = useState('')
    const [genre, setGenre] = useState(1)
    const [fandom, setFandom] = useState(1)
    const [category, setCategory] = useState(1)
    const dispatch = useDispatch()

    const {t} = useTranslation()

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchGenres())
        dispatch(fetchFandoms())
    }, [])

    const findId = (array, name) => {
        const el = array.find(el => el.name == name)
        console.log(el)
        return el.id
    }

    return (
        <div className="book__creation">
            <h3>{t('Book creation')}</h3>
            <div className="settings-container">
                <div className="settings-info__row">
                    <strong>{t('Category')}</strong>
                    <select onChange={event => {
                        const id = findId(categories, event.target.value)
                        setCategory(id)}}>{
                        categories.map(category => {
                            return (<option >{category.name}</option>);
                        })
                    }</select>
                </div>
                <div className="settings-info__row">
                    <strong>{t('Genre')}</strong>
                    <select onChange={event => {
                        const id = findId(genres, event.target.value)
                        setGenre(id)}}>{
                        genres.map(genre => {
                            return (<option>{genre.name}</option>);
                        })
                    }</select>
                </div>
                 <div className="settings-info__row">
                    <strong>{t('Image')}</strong>
                    <Upload id={name}></Upload>
                </div>
                <div className="settings-info__row">
                    <strong>{t('Fandom')}</strong>
                    <select onChange={event => {
                        const id = findId(fandoms, event.target.value)
                        setFandom(id)}}>{
                        fandoms.map(fandom => {
                            return (<option>{fandom.name}</option>);
                        })
                    }</select>
                </div>
                <div className="settings-info__row">
                    <strong>{t('Tags')}</strong>
                    <ReactTagInput className = "tags" tags={curTags}
                                   editable={true}
                                    readOnly={false}
                                    onChange={(newTags) => {
                                        setTags(newTags)}}/>
                </div>
                <div className="settings-info__row">
                    <strong>{t('Title')}</strong>
                    <textarea onChange={event => {
                        setName(event.target.value)
                    }}/>
                </div>
                <div className="settings-info__row">
                    <strong>{t('Description')}</strong>
                    <textarea onChange={event => {
                        setDescr(event.target.value)
                    }}/>
                </div>
                 <button type="button" className="btn btn-outline custom-button change-info" onClick={() => {
                    const userId = parseInt(CryptoJS.AES.decrypt(localStorage.getItem('curUser'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8))
                    addInitialBook(name, descr, genre, curTags, fandom, category, userId)
                    }}>{t('Create book')}</button>
            </div>
        </div>
    );

}

export default CreateBook;