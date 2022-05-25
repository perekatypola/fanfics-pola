import potter from "../potter.jpeg";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import ReactStars from "react-rating-stars-component";
import {useHistory} from "react-router-dom";
import like from "../like.png"
import "./BookCard.css"
import {addLike} from "../global";
import {setLike} from "../store/slices/bookSlice"
import {takeLike} from "../store/slices/bookSlice"
import {Cloudinary} from "@cloudinary/url-gen";
import library from "../default_poster.jpg"
import Comment from "../Comment/Comment";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";

const BookCard =(props) => {
    const bookInfo = useSelector(state => state.book)
    const {t, i18n} = useTranslation();
    const history = useHistory()
    const dispatch = useDispatch()
    const [posterImage, setPoster] = useState('')

    const cld = new Cloudinary({
          cloud: {
            cloudName: 'deixwcl0a'
          }
        });

    useEffect(() => {
        setImage()
    }, [])

    const setImage =(image) => {
        let poster = "poster" + props.bookId
        const myImage = cld.image(poster).toURL();
            let res = fetch(myImage).then(res => {
                if(res.status == "404") {
                    setPoster(library)
                }
                else {
                   setPoster(myImage)
                }
            })
    }

    return (
        <div>
            <h3 className="work-card__header work-card__header--out">{bookInfo.book.name}</h3>
            <div className="works__container works__container--book">
                    <div className="work-card work-card--book">
                        <div className="work-card__container">
                            <img className="work-card__poster" src={posterImage}/>
                            <div className="work-card__information">
                                <div className="work-card__line">
                                    <strong className="work-card__line--left">{t('Fandom')}</strong>
                                    <div className="work-card__line--right">{bookInfo.book.fandom.name}</div>
                                </div>
                                <div className="work-card__line">
                                    <strong className="work-card__line--left">{t('Genre')}</strong>
                                    <div className="work-card__line--right">{bookInfo.book.genre.name}</div>
                                </div>
                                <div className="work-card__line">
                                    <strong className="work-card__line--left">{t('Description')}</strong>
                                    <div className="work-card__line--right">{bookInfo.book.description}</div>
                                </div>
                                <div className="work-card__line">
                                    <strong className="work-card__line--left">{t('Tags')}</strong>
                                    <div className="work-card__line--right">
                                        {
                                            bookInfo.book.tags.map(tag => {
                                                return (
                                                    <span className="work-card__tag" onClick={() => {
                                                        history.push("/works", {tagId: tag.id})
                                                    }}>{tag.name}</span>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book__rating">
                        <div className="like-container" onClick={() => {
                            document.querySelector(".like-container").classList.toggle("liked")
                            if(document.querySelector(".like-container").classList.contains("liked")) {
                                addLike(bookInfo.book.id)
                                dispatch(setLike())
                            }
                            else {
                                dispatch(takeLike())
                            }
                        }}>
                            <div>
                                <img className="liked" src={like}/>
                                <strong className="like-text">{bookInfo.book.likes}</strong>
                            </div>
                            <strong>
                            {
                                (() => {
                                     if(localStorage.getItem('jwt')) {
                                         return t('Like')
                                     }
                                     else {
                                         return t('Liked')
                                     }
                                })()
                            }
                            </strong>
                        </div>
                        <ReactStars value={bookInfo.book.rating} edit={false} size={20} activeColor = "#b76a47"/>
                    </div>
                </div>
        </div>
    );
    return <div></div>
}

export {BookCard}