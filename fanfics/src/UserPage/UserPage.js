import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import './UserPage.css'
import {getRating, deleteFanfic} from "../global";
import {switchTheme} from "../App";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import add from "../add.png";
import edit from "../edit.png";
import adduser from "../adduser.png";
import InlineEdit from 'react-edit-inplace'

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [] ,
            info:'Поэт, прозаик',
            contacts: 'ВК:'
        };
        this.dataChanged = this.dataChanged.bind(this);
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

    dataChanged = (data) => {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        console.log(data)
        this.setState({...data})
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
                return <>
                    <div className = "user-profile">
                        <div className="card">
                            <div className="card-header user-header">
                                <div className = "add-image">
                                    <img className = "user-add" src={adduser} alt="adduser"></img>
                                    <button className = "btn custom-button">Загрузить</button>
                                </div>
                                <p className="h3">
                                    Пользователь:
                                </p>
                                <InlineEdit className = "edit-box"
                                    validate={this.customValidateText}
                                    activeClassName="editing"
                                    text={localStorage.getItem('curUser')}
                                    paramName="message"
                                    change={this.dataChanged}
                                    style={{
                                        margin: 0,
                                        padding: 0,
                                        outline: 0,
                                        border: 0
                                    }}
                                />
                            </div>
                            <div className="card-body">
                                <p className="h3">
                                    O себе:
                                </p>
                                <InlineEdit className = "edit-box"
                                            validate={this.customValidateText}
                                            activeClassName="editing"
                                            text={this.state.info}
                                            paramName="message"
                                            change={this.dataChanged}
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                                outline: 0,
                                                border: 0
                                            }}
                                />
                                <p className="h3">
                                    Контактная информация:
                                </p>
                                <InlineEdit className = "edit-box"
                                            validate={this.customValidateText}
                                            activeClassName="editing"
                                            text={this.state.contacts}
                                            paramName="message"
                                            change={this.dataChanged}
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                                outline: 0,
                                                border: 0
                                            }}
                                />
                            </div>
                        </div>
                    </div>
                </>

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