import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import './UserPage.css'
import CommentArea from "../CommentArea/CommentArea";
import {getRating, deleteFanfic} from "../global";
import user from "../user.png";
import {switchTheme} from "../App";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Works from "../Fanfics/Works";
import add from "../add.png";
import edit from "../edit.png";
class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [] ,
            checked:'',
            editing:false
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

        const renderUserPage = ()=> {
            if (this.state.editing === false)
            {
                return <>
                    <div className="user-profile">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <p className="h2">
                                        Пользователь:
                                    </p>
                                    <p className="h3">{localStorage.getItem('curUser')}</p>
                                </div>
                                <button className="user-button" onClick={() => {
                                    window.location = "/editUser"
                                }
                                }>
                                    <img className="edit-button" src={edit} alt="edit"></img>
                                </button>
                            </div>
                            <div className="card-body">
                                <p className="h3">
                                    O себе:
                                </p>
                                <p>
                                    ООООО
                                </p>
                                <p className="h3">
                                    Контактная информация:
                                </p>
                                <p>
                                    ООООО
                                </p>
                            </div>
                        </div>
                    </div>
                </>
        }
            else {
                return <>
                    <div className="user-profile">
                        <div className="card">
                            <div className="card-header">
                                <div>
                                    <p className="h2">
                                        Пользователь:
                                    </p>
                                    <p className="h3">{localStorage.getItem('curUser')}</p>
                                </div>
                                <button className="user-button" onClick={() => {
                                    window.location = "/editUser"
                                }
                                }>
                                    <img className="edit-button" src={edit} alt="edit"></img>
                                </button>
                            </div>
                            <div className="card-body">
                                <p className="h3">
                                    O себе:
                                </p>
                                <p>
                                    ООООО
                                </p>
                                <p className="h3">
                                    Контактная информация:
                                </p>
                                <p>
                                    ООООО
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            }

        }

        return (
            <div className="background UserPage">
                <MainHeader loggedIn = {true}></MainHeader>
                <Tabs>
                    <TabList  className="tab">
                        <Tab>Страница</Tab>
                        <Tab>Все работы</Tab>
                    </TabList>
                    <TabPanel>
                        {renderUserPage()}
                    </TabPanel>
                    <TabPanel>
                        <div className="container user-works">
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                    <div className = "flex-box">
                                        <button className="user-button"
                                                onClick = {()=> {
                                                    window.location = "/createBook"
                                                }}>
                                            <img src = {add} alt = "add"></img>
                                        </button>
                                    </div>
                                    {renderWorks()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

            </div>
        );
    }
}

export default UserPage;