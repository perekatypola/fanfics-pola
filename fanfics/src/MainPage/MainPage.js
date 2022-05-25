import React, {useEffect} from "react";
import './MainPage.css'
import {TopWorks} from '../TopWorks/TopWorks'

import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFandoms} from "../store/slices/mainSlice";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
const MainPage = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.main.categories)
    const fandoms = useSelector(state => state.main.fandoms)
    const history= useHistory()
    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchFandoms())
    }, [])
    const {t, i18n} = useTranslation();

    const renderCategory = (category) => {
        const moveToWorks  = () => {
            history.push("/works", {category: category.id})
        }

        return (
            <div  key={category.id} onClick={moveToWorks} className="card-item">{category.name}</div>
        );
    }

    const renderCategories = (categories) => {
        return (
            <div>{
                categories.map(category => {
                return (
                    <div>
                        {renderCategory(category)}
                    </div>
                );
            })}</div>
        );
    }

    return (
            <div>
                <TopWorks/>
                        <div className="main-page__container">
                            <div className="main-page__card">
                                <h3> {t('Categories')}</h3>
                                {renderCategories(categories)}
                            </div>
                            <div className="main-page__card">
                                <h3>{t('Fandoms')}</h3>
                                <div>
                                    {
                                        fandoms.map(fandom => {
                                            return (
                                                <div key={fandom.id} onClick={() => {
                                                    history.push("/works", {fandom: fandom.id})
                                                }} className="card-item">{fandom.name}</div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
            </div>

        );
}

export default MainPage