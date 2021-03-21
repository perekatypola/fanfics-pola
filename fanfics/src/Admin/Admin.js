import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import './Admin.css'
import CommentArea from "../CommentArea/CommentArea";
import {getRating, deleteFanfic} from "../global";
import user from "../user.png";
import {switchTheme} from "../App";
class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [] ,
            checked:''
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/getUsers",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , Auth: localStorage.getItem('jwt')}
        }).then((response) => response.json()).then(res => {
            this.setState({users:res})
        })
    }

    render() {

        const renderUsers = () => {
            if(this.state.users.length === 0) {
                return <>
                    <p className = "display-4 text-center">Еще нет пользователей</p>
                </>
            }
            else
            {
                return <>
                    {
                        this.state.works.map(user =>
                            <React.Fragment>
                                <div className = "cell">
                                    <tr>
                                        <th scope="row"></th>
                                        <td class = "book-name">
                                            <Link to = "/userPage" onClick = {() => {}}>{user.name}</Link>
                                        </td>
                                        <td>
                                            <div className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Меню
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                    <button className="dropdown-item" >Удалить</button>
                                                    <button className="dropdown-item" >Блокировать</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </div>
                            </React.Fragment>
                        )}
                </>
            }
        }

        return (
            <div className="background ">
                <MainHeader loggedIn = {false}></MainHeader>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link" href ="#authors">Все авторы</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" aria-current="page" >Все работы</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active container" id="authors">
                        {renderUsers()}
                    </div>
                    <div className="tab-pane fade" id="works">
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;