import React, {useEffect} from "react";
import ReactStars from "react-rating-stars-component";
import {Link, useHistory, useParams} from 'react-router-dom';
import './UserPage.css'
import { Image } from 'cloudinary-react';
import arror from "../arror.png"
import ReactMarkdown from 'react-markdown';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserInfo, setInfoOpen} from "../store/slices/userSlice";
import Works from "../Fanfics/Works";
import Setting from "../Settings/Setting";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";
import {Cloudinary} from "@cloudinary/url-gen";
import {useTranslation} from "react-i18next";


const UserPage = () => {
    const {id} = useParams()
    const user = useSelector(state => {
        return state.user
    })

    const {t} = useTranslation()
    const decryptedId = CryptoJS.AES.decrypt(id, CLIENT_SECRET).toString(CryptoJS.enc.Utf8)
    // if(!decryptedId) window.location = "/"
    const history = useHistory();
    const dispatch = useDispatch()

    const cld = new Cloudinary({
          cloud: {
            cloudName: 'deixwcl0a'
          }
        });

    const myImage = cld.image(user.user.name).toURL();

    useEffect(() => {
        dispatch(fetchUserInfo(decryptedId))
    }, [])

    return (
            <div className="UserPage">
                <div className="user-header">
                    <div className="user-head">
                        <img className="user-poster" src={myImage}></img>
                        <strong className="user-page-name">{user.user.name}</strong>
                    </div>
                    <div className="user-menu">
                        <img src={arror} onClick={() => {
                            document.querySelector(".user-menu").classList.toggle("active")
                        }} className="user-menu__icon"/>
                        <ul className="user-menu__dropdown">
                            <li className="user-menu__item" onClick={() => {
                                document.querySelector(".user-menu").classList.remove("active")
                                document.querySelector(".user-info").classList.add("visible")
                                document.querySelector(".works").classList.remove("visible")
                                document.querySelector(".settings").classList.remove("visible")
                            }}>
                                {t('Information')}
                            </li>
                            <li className="user-menu__item"
                                onClick={() => {
                                    document.querySelector(".user-menu").classList.remove("active")
                                    document.querySelector(".user-info").classList.remove("visible")
                                    document.querySelector(".works").classList.add("visible")
                                    document.querySelector(".settings").classList.remove("visible")
                                }}
                            >
                                {t('Works')}
                            </li>
                            <li className="user-menu__item"
                                onClick={() => {
                                    document.querySelector(".user-menu").classList.remove("active")
                                    document.querySelector(".user-info").classList.remove("visible")
                                    document.querySelector(".works").classList.remove("visible")
                                    document.querySelector(".settings").classList.add("visible")
                                }}
                            >
                                {t('Settings')}
                            </li>
                            {(() => {
                                if(localStorage.getItem('curUser')) {
                                    if(CryptoJS.AES.decrypt(localStorage.getItem('curUser'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8)== user.user.id) {
                                        return (
                                                <li onClick={() => {
                                                    history.push("/createBook")
                                                }} className="user-menu__item">
                                                    {t('Add fanfic')}
                                                </li>
                                        );
                                    }
                                }
                            })()}
                        </ul>
                    </div>
                </div>
                <div className="user-info visible">
                    <strong>{t('About')}</strong>
                    <ReactMarkdown>{user.user.about}</ReactMarkdown>
                    <strong>{t('Contacts')}</strong>
                    <div>{user.user.contactInfo}</div>
                </div>
                <div className="works">
                    <Works user={decryptedId}/>
                </div>
                <div className="settings">
                    <Setting></Setting>
                </div>
            </div>
        );
}

export default UserPage;