import React, {useState} from "react";
import '../Register/Register.css'
import './Auth.css'
import vk from '../vk.png'
import cross from '../cross.png';
import FacebookAuth from 'react-facebook-auth';
import MyFacebookButton from './MyFacebookButton'
import {loginFacebook, loginVk, signIn} from '../global'
import { useTranslation } from 'react-i18next';

const Auth = () => {
    const {t, i18n} = useTranslation();
    const [name, setName] = useState();
    const [password, setPassword] = useState();

    const closePopup = () => {
        document.querySelector(".Auth").classList.remove("visible");
        document.querySelector("body").classList.remove("disable-scroll");
    }

    return (
        <div className="Auth">
            <div className="popup-background">
            </div>
            <div className="close-button" onClick={closePopup}>
                <img src = {cross} alt = "cancel"></img>
            </div>
            <div className="popup login-popup">
                    <form id="form">
                        <p className="display-4 text-center">{t('Sign in header')}</p>
                        <div className="cont p-4 my-3 border">
                            <div className="form-group">
                                <label htmlFor="inputUsername">{t('Name')}</label>
                                <input initialValue="" type="name" className="form-control" placeholder="Username"
                                       onChange = {event=> {
                                           setName(event.target.value)
                                           console.log(name)
                                       }}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="inputPassword">{t('Password')}</label>
                                <input initialValue="" type="password" className="form-control" id="passw"
                                       placeholder="Enter password"
                                       onChange = {event=> {
                                           setPassword(event.target.value)
                                       }}/>
                            </div>
                            <div className="form-group">
                                <div className="button-box">
                                    <button type="button" className="btn btn-outline custom-button sign-in"
                                            onClick = {()=> signIn(name, password)}
                                           >Sign In</button>
                                     <button type="button" className="btn btn-outline custom-button sign-in"
                                            onClick = {()=>  {document.querySelector(".Register").classList.add("visible")
                                            document.querySelector(".Auth").classList.remove("visible")}}
                                           >Sign Up</button>
                                </div>
                            </div>
                            <div className="login-output"></div>
                        </div>
                    </form>
                </div>
            </div>
        );
}

export default Auth