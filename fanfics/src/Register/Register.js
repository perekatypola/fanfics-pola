import React from "react";
import './Register.css'
import {setUser} from '../global'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import MainHeader from "../MainHeader/MainHeader";
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            password:''
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light">
                    <div className="header">
                        <label onClick = {()=>{
                            window.location = "/"
                        }}class = "application-name">Мордор</label>
                        <button className="btn btn-outline custom-button sign-up"
                        onClick = {()=> {window.location = '/auth'}}>Sign In</button>
                    </div>
                </nav>
                <form id="form">
                    <p className="display-4">Create your account</p>
                    <div className="cont p-4 my-3 border">
                        <div className="form-group">
                            <label htmlFor="inputUsername">Username</label>
                            <input initialValue="" type="name" className="form-control" placeholder="Username" id = "name"
                            onChange = {event=> {
                                this.setState({ name: event.target.value})
                            }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail" or="inputEmail">Email address</label>
                            <input initialValue="" type="email" className="form-control" placeholder="Enter email" id = "email"
                                   onChange = {event=> {
                                       this.setState({ email: event.target.value})
                                   }}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input initialValue="" type="password" className="form-control" id = "passw" placeholder="Enter password"
                                   onChange = {event=> {
                                       this.setState({password: event.target.value})
                                   }}/>
                        </div>
                        <div className="form-group">
                            <div className="button-box">
                                <button type="button" className="btn btn-outline custom-button sign-in"
                                        onClick = {() => {setUser(this.state.name , this.state.password,this.state.email)
                                            document.getElementById("form").reset();}}
                                >Sign Up</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register