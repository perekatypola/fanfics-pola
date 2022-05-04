import potter from "../potter.jpeg";
import React from "react";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

const BookCard =() => {
    const bookInfo = useSelector(state => state.book)
    const {t, i18n} = useTranslation();
    return (
        <div>
            <h3 className="work-card__header work-card__header--out">{bookInfo.book.name}</h3>
            <div className="works__container works__container--book">
                    <div className="work-card work-card--book">
                        <div className="work-card__container">
                            <img className="work-card__poster" src={potter}/>
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
                                                    <span className="work-card__tag">{tag.name}</span>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="book__rating">
                    </div>
                </div>
        </div>
    );
    return <div></div>
}

export {BookCard}