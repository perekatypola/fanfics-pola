import React from "react";
import ReactStars from "react-rating-stars-component";
import './RecentWorks.css'
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import {deleteFanfic, getRating, getTags} from '../global'
import CommentArea from "../CommentArea/CommentArea";
import {switchTheme} from "../App";
class RecentWorks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [],
            curTags:[]
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadRecentWorks",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json'}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({works:res})
        })
    }

    render() {
        const renderTags = () => {
            return <>
                {
                   this.state.curTags.map(tag =>
                        <React.Fragment>
                            <button disabled="true" className="btn tag-button text-center">{tag.text}</button>
                        </React.Fragment>
                    )})
                }
            </>
        }

        const renderWorks = () => {
            return <>
                {
                    this.state.works.map(work =>
                        <React.Fragment>
                            <div className = "card">
                                <div className="card-header books-headers">
                                    <Link className = "name-book" to = "/bookPage" onClick = {() => {localStorage.setItem('curBook' ,work.book_name)}}>{work.book_name}</Link>
                                </div>
                                <div className="card-body">
                                    <label>Описание:</label>
                                    <i  className="descr-text">
                                        {work.book_descr}
                                    </i>
                                </div>
                                <div className="card-footer">
                                    <ReactStars value = {work.cur_rating} size = {20} edit = {false} activeColor = "#b76a47" class="text-right"/>
                                </div>
                            </div>
                        </React.Fragment>
                    )}
            </>
        }

        return (
            <div className="RecentWorks background">
                <MainHeader></MainHeader>
                <div className="container">
                    <table className="table">
                        <tbody>
                        {renderWorks()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RecentWorks;