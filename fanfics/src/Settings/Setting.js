import React, {useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo, setInfoOpen} from "../store/slices/userSlice";
import {useTranslation} from "react-i18next";
import "./Settings.css"
import {setUser} from "../global";
import Upload from "../Upload/Upload";

const Settings = (props) => {
    const {t, i18n} = useTranslation();
    const user = useSelector(state => {
        return state.user
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserInfo(props.id))
    }, [])

    return (
            <div className="background Settings">
                <div className="main-page__card settings-card">
                    <h3>Настройки профиля</h3>
                        <ul className="settings-list">
                            {
                                (() => {
                                    console.log(window.screen.width)
                                    if(window.screen.width< 767) {
                                        return (
                                            <div>
                                                <li className="settings-list__item"
                                                onClick={() => {}}>
                                                    <a href="#settings-info">
                                                       Личная информация</a>
                                                </li>
                                                <li className="settings-list__item"
                                                onClick={() => {}}>
                                                    <a href="#avatar">
                                                       Аватар</a>
                                                </li>
                                                <li className="settings-list__item"
                                                onClick={() => {}}>
                                                    <a href="#password">
                                                       Смена пароля</a>
                                                </li>
                                            </div>
                                        );
                                    }
                                    else {
                                        return(
                                            <div>
                                                 <li className="settings-list__item"
                                                    onClick={() => {}}>
                                                        Личная информация
                                                    </li>
                                                    <li className="settings-list__item">
                                                        Аватар
                                                    </li>
                                                    <li className="settings-list__item">
                                                        Смена пароля
                                                    </li>
                                            </div>
                                        );
                                    }
                                })()
                            }
                        </ul>
                </div>
                <div className="settings-info" id="settings-info">
                    <div className="settings-own visible">
                        <h3>Личная информация</h3>
                        <div className="settings-container">
                            <div className="settings-info__row">
                                <strong>О себе</strong>
                                <textarea value={user.user.about}></textarea>
                            </div>
                            <div className="settings-info__row">
                                <strong>Контактная информация:</strong>
                                <textarea value={user.user.about}></textarea>
                            </div>
                        </div>
                        <button type="button" className="btn btn-outline custom-button change-info"
                                        onClick = {() => {setUser(this.state.name , this.state.password,this.state.email)
                                            document.getElementById("form").reset();}}
                                >Сохранить</button>
                    </div>
                    <div className="avatar" id="avatar">
                        <Upload></Upload>
                    </div>
                     <div className="password-change"  id= "password">
                        <h3>Смена пароля</h3>
                        <div className="settings-container">
                            <div className="settings-info__row">
                                <strong>Пароль:</strong>
                                <textarea value={user.user.password}></textarea>
                            </div>
                        </div>
                        <button type="button" className="btn btn-outline custom-button change-password"
                                        onClick = {() => {setUser(this.state.name , this.state.password,this.state.email)
                                            document.getElementById("form").reset();}}
                                >Сохранить</button>
                    </div>

                </div>
            </div>
        );
}


export default Settings;