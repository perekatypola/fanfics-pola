import React, {useEffect} from "react";
import potter from "../potter.jpeg"
import MainHeader from "../MainHeader/MainHeader";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import {Navigation, Pagination} from "swiper";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'

import "./TopWorks.css"
import {fetchRecentBooks} from "../store/slices/worksSlice";
import {useDispatch, useSelector} from "react-redux";
import CommentArea from "../CommentArea/CommentArea";


function TopWorks() {
    const topWorks = useSelector(state => state.works.topWorks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRecentBooks())
    }, [])

    return(
        <div className="tops-slider">
            <div className="tops-slider__container">
                <h2 className="tops-slider__header">Top works</h2>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation={true} modules={[Navigation,Pagination]}
                    breakpoints={{
                        768: {
                          slidesPerView: 2,
                        },
                        1200: {
                          slidesPerView: 5,
                        },
                      }}
                    >
                    {
                        topWorks.map(work => {
                            return (
                                <SwiperSlide>
                                    <a className="tops-slider__item">
                                        <img src={potter} />
                                    </a>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div>

            {/*<div className="tops-slider__slider swiper-container js-tops-slider">*/}
            {/*    <ul className="tops-slider__list swiper-wrapper">*/}

            {/*        <li className="tops-slider__item swiper-slide">*/}
            {/*            <img src={potter} />*/}
            {/*        </li>*/}
            {/*    </ul>*/}
            {/*    <div className="tops-slider__arrow--next">+</div>*/}
            {/*    <div className="tops-slider__arrow--prev">+</div>*/}
            {/*</div>*/}
        </div>
    )
}

export {TopWorks}