import React from "react";
import '../Register/Register.css'
import './Auth.css'
import vk from '../vk.png'
import FacebookAuth from 'react-facebook-auth';
import MyFacebookButton from './MyFacebookButton'
import {loginFacebook, loginVk, signIn} from '../global'
import {switchTheme} from "../App";
import user from "../user.png";
class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password:''
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
    }

    render() {
        return (
            <div className="Auth">
                <nav className="navbar navbar-light">
                    <div className="header">
                        <label onClick={() => {
                            window.location.href = "/"
                        }} className="application-name">Мордор</label>
                        <button type="button" className="btn btn-outline custom-button"
                                onClick = {() => {
                                    switchTheme()
                                }}>Тема</button>
                        <button className="btn btn-outline custom-button sign-up"
                        onClick={() => {window.location = '/regPage'}}>Регистрация</button>
                    </div>
                </nav>
                <form id="form">
                    <p className="display-4 text-center">Sign in to fanficbook</p>
                    <div className="cont p-4 my-3 border">
                        <div className="form-group">
                            <label htmlFor="inputUsername">Имя</label>
                            <input initialValue="" type="name" className="form-control" placeholder="Username"
                                   onChange = {event=> {
                                       this.setState({ name: event.target.value})
                                   }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Пароль</label>
                            <input initialValue="" type="password" className="form-control" id="passw"
                                   placeholder="Enter password"
                                   onChange = {event=> {
                                       this.setState({password: event.target.value})
                                   }}/>
                        </div>
                        <div className="form-group">
                            <div className="button-box">
                                <button type="button" className="btn btn-outline custom-button sign-in"
                                        onClick = {() => {
                                            signIn(this.state.name , this.state.password)
                                            }}>Sign In</button>
                            </div>
                            <div className="button-box">
                            <button type="button" className="btn vk-button"
                                    onClick = {() => {
                                        VK.Auth.login(function(response) {  // eslint-disable-line no-undef
                                            if (response.status === "connected") {
                                                loginVk(response.session.user.first_name)
                                            } else {
                                                // Пользователь нажал кнопку Отмена в окне авторизации
                                            }
                                        }.bind(this))
                                    }}>
                                <img src = {vk} alt = "vk"></img>
                            </button>
                            <FacebookAuth
                                appId="149884340333072"
                                component={MyFacebookButton}
                                callback = {loginFacebook}
                            />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Auth