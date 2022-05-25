import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import potter from "../potter.jpeg"
import "./Authors.css"
import {fetchAuthors} from "../store/slices/mainSlice";
import {useHistory} from "react-router-dom";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";
import socket, {blockUser, deleteUser, unblockUser} from "../global";
import arror from "../arror.png";
import {Cloudinary} from "@cloudinary/url-gen";
import library from "../default_poster.jpg";
import {useTranslation} from "react-i18next";

const Authors = () => {
    const dispatch = useDispatch()
    const authors = useSelector(state => state.main.authors)
    const [searchValue, setValue] = useState('')
    const {t} = useTranslation()

    useEffect(() => {
        dispatch(fetchAuthors())
    }, [])

    const history = useHistory()

    const filteredAuthors = authors.filter(author => {
        return author.name.toLowerCase().includes(searchValue)
    })

    const cld = new Cloudinary({
          cloud: {
            cloudName: 'deixwcl0a'
          }
        });

    const renderPoster =(name) => {
        let poster = name
        const myImage = cld.image(poster).toURL();
        return <img className="user-poster" src={myImage}/>
    }

    return (
        <div className="authors-container">
            <div className="search-container">
                <input placeholder={"Find author"} className="author-search__input"
                       onChange={event => setValue(event.target.value)}/>
            </div>
            {
                filteredAuthors.map(author => {
                    return (
                        <div className="author-card__container">
                            <a onClick={() => {
                                    window.location = "user/" + CryptoJS.AES.encrypt(author.id.toString(), CLIENT_SECRET).toString()
                                }}>
                                <div className="author-card">
                                    {renderPoster(author.name)}
                                    <div className="user-name">{author.name}</div>
                                </div>
                            </a>
                                {
                                    (() => {
                                        if (localStorage.getItem("admin") && CryptoJS.AES.decrypt(localStorage.getItem('admin'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8) == "true" && author.blocked == false) {
                                            return (
                                                <div className="user-menu" id={author.id}>
                                                    <img src={arror} onClick={() => {
                                                        document.getElementById(author.id).classList.toggle("active")
                                                    }} className="user-menu__icon"/>
                                                    <ul className="user-menu__dropdown">
                                                        <li className="user-menu__item"
                                                            onClick={() => {
                                                                deleteUser(author.id).then(() => {
                                                                    window.location.reload()
                                                                })
                                                            }}>
                                                            {t('Delete')}
                                                        </li>
                                                        <li className="user-menu__item"
                                                            onClick={() => {
                                                                blockUser(author.id)
                                                            }}>
                                                            {t('Block')}
                                                        </li>
                                                    </ul>
                                                </div>
                                            );
                                        }
                                    })()
                                }
                                {
                                (() => {
                                    if (localStorage.getItem("admin") && CryptoJS.AES.decrypt(localStorage.getItem('admin'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8) == "true" && author.blocked == true) {
                                        return (
                                            <div className="user-menu" id={author.id}>
                                                <img src={arror} onClick={() => {
                                                    document.getElementById(author.id).classList.toggle("active")
                                                }} className="user-menu__icon"/>
                                                <ul className="user-menu__dropdown">
                                                    <li className="user-menu__item"
                                                        onClick={() => {
                                                            deleteUser(author.id)
                                                        }}>
                                                        {t('Delete')}
                                                    </li>
                                                    <li className="user-menu__item"
                                                        onClick={() => {
                                                             unblockUser(author.id)
                                                        }}>
                                                        {t('Unblock')}
                                                    </li>
                                                </ul>
                                            </div>
                                        );
                                    }
                                })()
                            }
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Authors;