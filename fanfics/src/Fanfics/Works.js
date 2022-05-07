import React, {useEffect, useState} from "react";
import ReactStars from "react-rating-stars-component";
import './Works.css'
import {Link, useLocation} from 'react-router-dom';
import potter from "../potter.jpeg";
import sherlock from "../sherlock.jpg"
import MainHeader from "../MainHeader/MainHeader";
import CommentArea from "../CommentArea/CommentArea";
import {deleteFanfic} from "../global";
import {setWorks} from "../store/slices/worksSlice";
import {useDispatch, useSelector} from "react-redux";
import {BookCard} from "../BookCard/BookCard";
import {fetchBooks, fetchWorksByCategory} from "../store/slices/mainSlice";
import {useTranslation} from "react-i18next";
import arror from "../arror.png";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";

function Works(props) {
    let books = useSelector(state => {
        console.log(state)
        return state.main.books});
    const dispatch = useDispatch()
    const location = useLocation()

    const {t, i18n} = useTranslation();

    useEffect(() => {
        if(location.state) {
            dispatch(fetchBooks(location.state))
        }
        else {
            dispatch(fetchBooks())
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
                                                    if(localStorage.getItem("admin") && CryptoJS.AES.decrypt(localStorage.getItem('admin'), CLIENT_SECRET).toString(CryptoJS.enc.Utf8)== "true") {
                                                         return (
                                                          <div className="user-menu user-menu--admin">
                                                             <img src={arror} onClick={() => {
                                                                 document.querySelector(".user-menu--admin").classList.toggle("active")
                                                             }} className="user-menu__icon"/>
                                                             <ul className="user-menu__dropdown">
                                                                 <li className="user-menu__item">
                                                                     Удалить книгу
                                                                 </li>
                                                                 <li className="user-menu__item">
                                                                     Редактировать книгу
                                                                 </li>
                                                             </ul>
                                                          </div>
                                                        );
                                                    }
                                                })()}
                                            </div>
                                        <div className="work-card__container">
                                            <img className="work-card__poster" src={potter}/>
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
                                                    <div className="work-card__line--right">
                                                        {
                                                            bookInfo.tags.map(tag => {
                                                                return (
                                                                    <span className="work-card__tag">{tag.name}</span>
                                                                );
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                            </div>
                                            </div>

                                        // <div className = "card">
                                        //     <div className="card-header books-headers">
                                        //         <Link className = "name-book" to = "/bookPage" onClick = {() => {localStorage.setItem('curBook' ,work.book_name)}}>{work.book_name}</Link>
                                        //         <div className="nav-item dropdown">
                                        //             <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                        //                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        //             </a>
                                        //             <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        //                 <button className="dropdown-item" onClick={()=>{
                                        //                     deleteFanfic(work).then(() => {
                                        //                         this.setState({works: [...this.state.works.filter(el => el.book_name != work.book_name)]})
                                        //                     })
                                        //                 }}>Удалить</button>
                                        //                 <button className="dropdown-item" onClick  = {() => {
                                        //                     localStorage.setItem('curBook' , work.book_name)
                                        //                     window.location =  "/editBook"
                                        //                 }}>Редактировать</button>
                                        //             </div>
                                        //         </div>
                                        //     </div>
                                        //     <div className="card-body">
                                        //         <label>Описание:</label>
                                        //         <i className="descr-text">
                                        //             {work.book_descr}
                                        //         </i>
                                        //     </div>
                                        //     <div className="card-footer">
                                        //         <ReactStars value = {work.cur_rating} size = {20} edit = {false} activeColor = "#b76a47" class="text-right"/>
                                        //     </div>
                                        // </div>
                                    );}
                                )}
                        </div>
    )
}

export default Works;