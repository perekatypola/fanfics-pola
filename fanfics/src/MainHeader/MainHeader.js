import logo from '../logo.png'
import icon from '../icon.png'
import dark_icon from "../dark-icon.png"
import theme from "../theme.png"
import dark_theme from "../dark-theme.png"
import logout from "../logout.png"
import dark_logout from "../dark-logout.png"
import './MainHeader.css'
import language from "../internet.png"

import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyTheme, changeTheme} from "../store/slices/mainSlice";
import {hideNodesWithUserStatusName} from "../helpers";
import {useHistory} from "react-router-dom";

import {fetchUserInfo} from "../store/slices/userSlice";

import * as CryptoJS from 'crypto-js';

import {CLIENT_SECRET} from "../config";
import burger from "../burger.png"
import dark_menu from "../dark-menu.png"
import {useTranslation} from "react-i18next";


function MainHeader() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(state => state.user.user)
    const {t, i18n} = useTranslation()

    let iconState = null
    if(localStorage.getItem("darkTheme") == "1") {
      iconState = dark_icon
    }
    else {
        iconState = icon
    }
    const [iconImg, setIcon] = useState(iconState)


    const changeThemeColors = () => {
        if(localStorage.getItem("darkTheme") == "1") {
            setIcon(dark_icon)
        }
        else {
             setIcon(icon)
        }
    }

    const renderLogout = () => {
        if(localStorage.getItem("darkTheme") == "1") {
            return <img src={dark_logout}/>
        }
        else {
            return <img src={logout}/>
        }
    }

    const renderBurger = () => {
       if(localStorage.getItem("darkTheme") == "1") {
            return <img onClick={() => {
                document.querySelector(".main-menu").classList.toggle("active")
            }}src={dark_menu}/>
        }
        else {
            return <img onClick={() => {
                document.querySelector(".main-menu").classList.toggle("active")
            }}src={burger}/>
        }
    }

    const renderTheme = () => {
        if(localStorage.getItem("darkTheme") == "1") {
            return <img onClick={()=> {
                dispatch(changeTheme())
                changeThemeColors()
            }}  src={dark_theme}/>
        }
        else {
            return <img onClick={()=> {
                dispatch(changeTheme())
                changeThemeColors()
            }}  src={theme}/>
        }
    }

    useEffect(() => {
        dispatch(applyTheme());
        if(localStorage.getItem('curUser')) {
            dispatch(fetchUserInfo(CryptoJS.AES.decrypt(localStorage.getItem('curUser'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8)))
        }
        hideNodesWithUserStatusName();
    }, [])

    const openPopup = () => {
        document.querySelector("body").classList.add("disable-scroll");
        document.querySelector(".Auth").classList.add("visible");
    }

    return(
        <div className = "MainHeader">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="header">
                        <div onClick={() => {
                            window.location = "/"
                        }} className="application-name">
                            <img src = {logo} alt = "logo"/>
                        </div>
                        <div
                            className="theme-icon"
                        >
                            {(() => {
                                if(window.screen.width > 767) {
                                    return (
                                        <div className="header-right">
                                            {renderTheme()}
                                            <img onClick={() => {
                                                if(i18n.language == "en") {
                                                    i18n.changeLanguage("ru")
                                                }
                                                else {
                                                     i18n.changeLanguage("en")
                                                }
                                            }} className="language" src={language}/>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className="main-menu">
                                                {renderBurger()}
                                                <ul className="user-menu__dropdown main-menu__dropdown">
                                                    <li className="user-menu__item main-menu__item" onClick={() => {
                                                        dispatch(changeTheme())
                                                        changeThemeColors()
                                                    }}>
                                                        Сменить тему
                                                    </li>
                                                    <li className="user-menu__item main-menu__item" onClick={() => {
                                                        window.location="/works"
                                                    }}>
                                                        Фанфики
                                                    </li>
                                                    <li className="user-menu__item main-menu__item" onClick={() => {
                                                        window.location="/authors"
                                                    }}>
                                                        Авторы
                                                    </li>
                                                    <li className="user-menu__item main-menu__item" onClick={() => {
                                                        window.location="/authors"
                                                    }}>
                                                        Изменить язык
                                                    </li>
                                                </ul>
                                        </div>
                                    );
                                }
                            })()}
                        </div>

                        <a className="sign-in-button" data-user-status="anonymous"
                            onClick={openPopup}>
                            <img src={iconImg}/>
                            <span>Войти</span>
                        </a>
                        <div>
                            <a className="account" data-user-status="sign-in"
                            onClick={() => {
                                const CryptoJS = require('crypto-js');
                                window.location = "/user/" + localStorage.getItem('curUser')
                            }}>
                                <img src={iconImg}/>
                                <span>{user.name}</span>
                            </a>
                            <a className="sign-out-button" data-user-status="sign-in"
                            onClick={() => {
                                localStorage.removeItem("jwt")
                                localStorage.removeItem("curUser")
                                localStorage.removeItem("admin")
                                window.location = "/"
                            }}>
                                {renderLogout()}
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
    )
}


export default MainHeader