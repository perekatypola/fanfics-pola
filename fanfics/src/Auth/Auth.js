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
                        onClick={() => {window.location = '/reg'}}>Sign Up</button>
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
                                        onClick = {() => {signIn(this.state.name , this.state.password)}}>Sign In</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Auth