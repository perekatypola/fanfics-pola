import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import './UserPage.css'
import {getRating, deleteFanfic, updateUser} from "../global";
import {switchTheme} from "../App";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import add from "../add.png";
import edit from "../edit.png";
import adduser from "../adduser.png";
import InlineEdit from 'react-edit-inplace'
import Upload from "../Upload/Upload";
import { Image } from 'cloudinary-react';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: [] ,
            curUser: localStorage.getItem('curUser'),
            info:'Информация о тебе',
            contacts: 'Твои контакты' ,
            modalActive: 'modal' ,
            imageIsLoaded: false
        };
        this.userChanged = this.userChanged.bind(this);
        this.infoChanged = this.infoChanged.bind(this);
        this.contactsChanged = this.contactsChanged.bind(this);
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadUserWorks", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Auth: localStorage.getItem('jwt'),
                "AdminModeUser": localStorage.getItem('curUser')
            }
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({works: res})
        })
        fetch("https://fanfics-pola.herokuapp.com/loadUserInfo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Auth: localStorage.getItem('jwt'),
            },
            body : JSON.stringify({user: localStorage.getItem('curUser')})
        }).then((response) => response.json()).then(res => {
            if(res.info)
                this.setState({info: res.info})
            if(res.contacts)
                this.setState({contacts: res.contacts})
        })
        this.loadImages()

    }

    loadImages = async () => {
        console.log("loading")
        try {
            const res = await fetch("https://fanfics-pola.herokuapp.com/images");
            const data = await res.json();
            console.log(data)
            this.setState({images: data})
            if(this.state.images.indexOf(this.state.curUser)>=0) {
                this.setState({imageIsLoaded: true})
            }
        } catch (err) {
            console.error(err);
        }
    };

    userChanged = (data) => {
        this.setState({curUser: data.message})
    }

    infoChanged = (data) => {
        this.setState({ info: data.message})
    }

    contactsChanged = (data) => {
        this.setState({ contacts: data.message})
    }

    render() {
        const renderImage = () => {
            if(this.state.imageIsLoaded) {
                return <>
                    <Image
                        className = "user-add user-image"
                        cloudName="dncpfo6oa"
                        publicId={this.state.curUser}
                        crop="scale"
                    />
                    <button className = "btn custom-button "
                            onClick = {() => {
                            }}>Удалить</button>
                    </>
            }
            else {
                return <>
                    <img className = "user-add" src={adduser} alt="adduser"></img>
                    <button className = "btn custom-button" onClick = {() => {
                        setInterval(this.loadImages , 1000)
                        setModalState("modal active")
                        console.log(this.state.modalActive)}}>Загрузить</button>
                    </>
            }
        }


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

        const setModalState = (state) => {
            this.setState({modalActive: state})
        }

        const renderUserPage = ()=> {
                return <>
                    <div className = "user-profile">
                        <div className="card">
                            <div className="card-header user-header">
                                <div className = "add-image">
                                    {renderImage()}
                                </div>
                                <div>
                                    <p className="h3">
                                        Пользователь:
                                    </p>
                                    <InlineEdit className = "edit-box"
                                                validate={this.customValidateText}
                                                activeClassName="editing"
                                                text={this.state.curUser}
                                                paramName="message"
                                                change={this.userChanged}
                                                style={{
                                                    margin: 0,
                                                    padding: 0,
                                                    outline: 0,
                                                    border: 0
                                                }}
                                    />
                                </div>
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
                                            change={this.infoChanged}
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
                                            change={this.contactsChanged}
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                                outline: 0,
                                                border: 0
                                            }}
                                />
                                    <button onClick = {()=> {
                                        updateUser(this.state.curUser ,localStorage.getItem('curUser') , this.state.info , this.state.contacts)

                                    }}className="btn custom-button">Обновить</button>
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
                        <div className="container custom-container user-works">
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
                <Upload active = {this.state.modalActive} setState = {setModalState}/>
            </div>
        );
    }
}

export default UserPage;