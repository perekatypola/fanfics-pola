import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import './UserPage.css'
import CommentArea from "../CommentArea/CommentArea";
import {getRating, deleteFanfic} from "../global";
import user from "../user.png";
import {switchTheme} from "../App";
class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [] ,
            checked:''
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadUserWorks",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , Auth: localStorage.getItem('jwt') , "AdminModeUser" : localStorage.getItem('curUser')}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({works:res})
        })
    }

    render() {

        const renderWorks = () => {
            if(this.state.works.length === 0) {
                return <>
                <p className = "display-4 text-center">Еще нет работ</p>
                </>
            }
            else
            {
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
                                                <button className="dropdown-item" onClick = {() => {
                                                    localStorage.setItem('curBook' , work.book_name)
                                                    window.location = "/editBook"
                                                }}>Редактировать</button>
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
        }

        return (
            <div className="background UserPage">
                <MainHeader loggedIn = {true}></MainHeader>
                <div className="container user-works">
                    <div className="table-responsive">
                    <table className="table">
                        <tbody>
                        {renderWorks()}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPage;