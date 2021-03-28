import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import CommentArea from "../CommentArea/CommentArea";
import {deleteFanfic} from "../global";
class Results extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: JSON.parse(localStorage.getItem('results'))
        };
    }

    componentDidMount() {
    }

    render() {
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
                                    <i className="descr-text">
                                        {work.book_desc}
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
            <div className="Works background">
                <MainHeader></MainHeader>
                <div className="container custom-container">
                    <table className="table">
                        <tbody>
                        {console.log(this.state.works)}
                        {renderWorks()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Results;