import React, {useEffect, useState} from "react";
import './Works.css'
import {useHistory, useLocation} from 'react-router-dom';
import potter from "../potter.jpeg";
import {useDispatch, useSelector} from "react-redux";
import {fetchBooks} from "../store/slices/mainSlice";
import {useTranslation} from "react-i18next";
import arror from "../arror.png";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";
import socket from "../global"
import {Cloudinary} from "@cloudinary/url-gen";
import kitten from "../kitten.png";

function Works(props) {
    let books = useSelector(state => state.main.books);
    const dispatch = useDispatch()
    const location = useLocation()
    const [posterImage, setPoster] = useState('')
    const {t, i18n} = useTranslation();
    const history = useHistory()


    const TagItem =(props) => {
        const moveByTag = () => {
            history.push("/works", {tagId: props.tag.id})
            window.location.reload()
        }

        return (
            <span className="work-card__tag" onClick={moveByTag}>{props.tag.name}</span>
        );
    }

    const Tags = (props) => {
        const listItems = props.tags.map(tag => {
            return <TagItem tag={tag}/>
        })

        return (
            <div className="work-card__line--right">
                {listItems}
            </div>
        );
    }
    const cld = new Cloudinary({
          cloud: {
            cloudName: 'deixwcl0a'
          }
        });

    const renderPoster =(image) => {
        let poster = "poster" + image
        const myImage = cld.image(poster).toURL();
        return <img className="work-card__poster" src={myImage} onClick = {() => {
            socket.send("message");
        }}/>
    }


    useEffect(() => {
        if(location.state) {
            dispatch(fetchBooks(location.state))
        }
        else {
            if(props) {
                dispatch(fetchBooks({user: props.user}))
            }
            else {
                dispatch(fetchBooks())
            }
        }
    }, [])

        return (
            <div className="works__container">
                {
                    books.map(bookInfo =>
                        {
                            return (
                                <div>
                                    <div>
                                        <div className="work-card">
                                            <div className= "work-card__main-header">
                                                <h3 className="work-card__header" onClick={() => {
                                                    window.location = `/bookPage/${bookInfo.id}`
                                                }}>
                                                    {bookInfo.name}
                                                </h3>
                                                {(() => {
                                                    if(localStorage.getItem("admin") && CryptoJS.AES.decrypt(localStorage.getItem('admin'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8)== "true"
                                                    || props.user) {
                                                         return (
                                                          <div className="user-menu user-menu--admin" id={bookInfo.id}>
                                                             <img src={arror} onClick={() => {
                                                                 document.getElementById(bookInfo.id).classList.toggle("active")
                                                             }} className="user-menu__icon"/>
                                                             <ul className="user-menu__dropdown">
                                                                 <li className="user-menu__item">
                                                                     Удалить книгу
                                                                 </li>
                                                                 <li className="user-menu__item" onClick={() => {
                                                                     history.push("/editBook/" + bookInfo.id)
                                                                 }}>
                                                                     Редактировать книгу
                                                                 </li>
                                                             </ul>
                                                          </div>
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        <div className="work-card__container">
                                            {renderPoster(bookInfo.id)}
                                            <div className="work-card__information">
                                                <div className="work-card__line">
                                                    <strong className="work-card__line--left">{t('Fandom')}</strong>
                                                    <div className="work-card__line--right">{bookInfo.fandom.name}</div>
                                                </div>
                                                <div className="work-card__line">
                                                    <strong className="work-card__line--left">{t('Genre')}</strong>
                                                    <div className="work-card__line--right">{bookInfo.genre.name}</div>
                                                </div>
                                                <div className="work-card__line">
                                                    <strong className="work-card__line--left">{t('Description')}</strong>
                                                    <div className="work-card__line--right">{bookInfo.description}</div>
                                                </div>
                                                <div className="work-card__line">
                                                    <strong className="work-card__line--left">{t('Tags')}</strong>
                                                    <Tags tags={bookInfo.tags}/>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                            </div>
                                            </div>
                                    );}
                                )}
                        </div>
    )
}

export default Works;