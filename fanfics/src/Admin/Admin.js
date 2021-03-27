import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Admin.css'
import Works from '../Fanfics/Works'
import CommentArea from "../CommentArea/CommentArea";
import {deleteUser, getRating} from "../global";
import user from "../user.png";
import {switchTheme} from "../App";
import {blockUser} from '../global'
class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [] ,
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
                                            <p>Status : {user.status} </p>
                                        </td>
                                        <td>
                                            <div className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"
                                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                </a>
                                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                    <button className="dropdown-item" onClick={() => {
                                                        deleteUser(user.name).then(res => {
                                                            this.setState({users : [...this.state.users.filter(el => el.name != user.name)]})
                                                        })
                                                    }}>Удалить</button>
                                                    <button className="dropdown-item" onClick={() => {
                                                        blockUser(user.name , user.status).then(res => {
                                                            console.log(res.name)
                                                            this.setState({users : [...this.state.users.filter(el => el.name != res.name) , res]})
                                                        })
                                                    }}>Блокировать/Разблокировать</button>
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
                <Tabs>
                    <TabList  className="tab">
                        <Tab>Все авторы</Tab>
                        <Tab>Все фанфики</Tab>
                    </TabList>
                    <TabPanel>
                        <div className = "custom-container">
                            <table className="table-responsive ">
                                <tbody>
                                {renderUsers()}
                                </tbody>
                            </table>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <Works></Works>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

export default Admin;