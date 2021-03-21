import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import './Admin.css'
import CommentArea from "../CommentArea/CommentArea";
import {deleteUser} from "../global";
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
            this.setState({users:res.users})
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
                        this.state.users.map(user =>
                            <React.Fragment>
                                <div className = "cell">
                                    <tr>
                                        <th scope="row"></th>
                                        <td class = "book-name">
                                            <Link to = "/user" onClick = {() => {localStorage.setItem('curUser' , user.name)}}>{user.name}</Link>
                                        </td>
                                        <td>
                                            <div className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                    <button className="dropdown-item" onClick={() => {
                                                        deleteUser(user.name)
                                                    }}>Удалить</button>
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
                    <li className="nav-item tab">
                        <a className="nav-link active" id = "authorsTab" aria-selected="true"  href ="#authors" onClick = {()=> {
                            document.getElementById("authorsTab").classList.add("active")
                            document.getElementById("worksTab").classList.remove("active")
                        }}>Все авторы</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id = "worksTab" href="#" onClick={()=> {
                            document.getElementById("authorsTab").classList.remove("active")
                            document.getElementById("worksTab").classList.add("active")
                        }}>Все работы</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className="tab-pane fade show active container" id="authors">
                        <table className="table">
                            <tbody>
                        {renderUsers()}
                            </tbody>
                        </table>
                    </div>
                    <div className="tab-pane fade" id="works">
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;