import React from "react";
import ReactStars from "react-rating-stars-component";
import './Works.css'
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import CommentArea from "../CommentArea/CommentArea";
import {deleteFanfic} from "../global";
class Works extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: []
        };
    }

    componentDidMount() {
        fetch("https://fanfics-pola.herokuapp.com/loadWorks",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json'}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({works:res})
        })
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
                                    <div className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </a>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <button className="dropdown-item" onClick={()=>{deleteFanfic(work)}}>Удалить</button>
                                            <button className="dropdown-item" >Редактировать</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <label>Описание:</label>
                                    <i className="descr-text">
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
            <div className="Works background">
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

export default Works;