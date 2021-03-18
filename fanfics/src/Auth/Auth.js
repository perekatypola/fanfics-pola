import React from "react";
import '../Register/Register.css'
import './Auth.css'
import {signIn} from '../global'
class Auth extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password:''
        };
    }

    componentDidMount() {}

    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                    <div className="header">
                        <label onClick={() => {
                            window.location = "/"
                        }} className="application-name">Мордор</label>
                        <button className="btn btn-outline custom-button sign-up"
                        onClick={() => {window.location = '/regPage'}}>Sign Up</button>
                    </div>
                </nav>
                <form id="form">
                    <p className="display-4">Sign in to fanficbook</p>
                    <div className="cont p-4 my-3 border">
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input initialValue="" type="name" className="form-control" placeholder="Username"
                                   onChange = {event=> {
                                       this.setState({ name: event.target.value})
                                   }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
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
                            <button type="button" className="btn btn-outline custom-button sign-in"
                                    onClick = {() => {
                                        VK.Auth.login(function(response) {  // eslint-disable-line no-undef
                                            if (response.status === "connected") {
                                                console.log(response.session.user.first_name)
                                                fetch("https://fanfics-pola.herokuapp.com/vkAuth", {
                                                    method: 'POST',
                                                    headers: {'Content-Type': 'application/json'} ,
                                                    body : JSON.stringify({name : response.session.user.first_name})
                                                }).then((response) => response.text()).then(result => {
                                                    localStorage.setItem('jwt' , result)
                                                    console.log(result)
                                                })
                                            } else {
                                                // Пользователь нажал кнопку Отмена в окне авторизации
                                            }
                                        }.bind(this))
                                    }}>VK</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Auth