import React, {useState} from "react";
import './Register.css'
import cross from "../cross.png";
import {register} from "../global"
import {useTranslation} from "react-i18next";

const Register = () =>  {
    const {t, i18n} = useTranslation();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const closePopup = () => {
        document.querySelector(".Register").classList.remove("visible");
        document.querySelector("body").classList.remove("disable-scroll");
    }

        return (
            <div className="Register">
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
                                    <label htmlFor="inputPassword">Email</label>
                                    <input initialValue="" type="email" className="form-control" id="email"
                                           placeholder="Enter email"
                                           onChange = {event=> {
                                               setEmail(event.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputUsername">Имя</label>
                                    <input initialValue="" type="name" className="form-control" placeholder="Username"
                                           onChange = {event=> {
                                               setName(event.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPassword">Пароль</label>
                                    <input initialValue="" type="password" className="form-control" id="passw"
                                           placeholder="Enter password"
                                           onChange = {event=> {
                                               setPassword(event.target.value)
                                           }}/>
                                </div>
                                <div className="form-group">
                                    <div className="button-box">
                                        <button type="button" className="btn btn-outline custom-button sign-in"
                                                onClick = {()=> register(name, password, email)}
                                               >Sign Up</button>
                                    </div>
                                </div>
                                <div className="reg-output lin-output"></div>
                            </div>
                        </form>
                    </div>
            </div>
        );
}

export default Register