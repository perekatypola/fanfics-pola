import logo from '../logo.png'
import icon from '../icon.png'
import theme from "../theme.png"
import logout from "../logout.png"
import './MainHeader.css'

import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {applyTheme, changeTheme} from "../store/slices/mainSlice";
import {hideNodesWithUserStatusName} from "../helpers";
import {useHistory} from "react-router-dom";
import {fetchUserInfo} from "../store/slices/userSlice";


function MainHeader() {
    const dispatch = useDispatch()
    const history = useHistory();
    const user = useSelector(state => state.user.user)
    useEffect(() => {
        dispatch(applyTheme());
        dispatch(fetchUserInfo(localStorage.getItem("curUser")))
        hideNodesWithUserStatusName();
    }, [])

    const openPopup = () => {
        document.querySelector("body").classList.add("disable-scroll");
        document.querySelector(".Auth").classList.add("visible");
    }
    return(
        <div className = "MainHeader">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="header">
                        <div onClick={() => {
                            window.location = "/"
                        }} className="application-name">
                            <img src = {logo} alt = "logo"/>
                        </div>
                        <div
                            className="theme-icon"
                            onClick={()=> {
                                dispatch(changeTheme())
                            }}
                        >
                            <img src={theme}/>
                        </div>

                        {/*<form className="form mr-auto">*/}
                        {/*    <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" onChange = {event => {*/}
                        {/*        this.setState({searchText : event.target.value})*/}
                        {/*    }}/>*/}
                        {/*</form>*/}
                        {/*<button className="btn custom-button"*/}
                        {/*        onClick={()=> {*/}
                        {/*            fetch("https://fanfics-pola.herokuapp.com/search",  {*/}
                        {/*                method: 'POST',*/}
                        {/*                headers:{'Content-Type': 'application/json'},*/}
                        {/*                body: JSON.stringify({searchText: this.state.searchText})*/}
                        {/*            }).then((response) => response.json()).then(res => {*/}
                        {/*                console.log(res.result)*/}
                        {/*                localStorage.setItem('results' ,  JSON.stringify(res.result))*/}
                        {/*                window.location = "/results"*/}
                        {/*            })*/}
                        {/*        }}*/}
                        {/*>Поиск</button>*/}

                        {/*<button className="btn custom-button sign-in-button"*/}
                        {/*    onClick = {() =>{window.location = "/"*/}
                        {/*    localStorage.setItem('jwt' , "")}*/}
                        {/*}>Выйти</button>*/}
                        <a className="sign-in-button" data-user-status="anonymous"
                            onClick={openPopup}>
                            <img src={icon}/>
                            <span>Войти</span>
                        </a>
                        <div>
                            <a className="account" data-user-status="sign-in"
                            onClick={() => {
                                window.location = "/user/" + localStorage.getItem("curUser")
                            }}>
                                <img src={icon}/>
                                <span>{user.name}</span>
                            </a>
                            <a className="sign-out-button" data-user-status="sign-in"
                            onClick={() => {
                                localStorage.removeItem("jwt")
                                localStorage.removeItem("curUser")
                            }}>
                                <img src={logout}/>
                            </a>
                        </div>
                        {/*<button className="user-button"*/}
                        {/*onClick = {()=> {*/}
                        {/*    fetch("https://fanfics-pola.herokuapp.com/getUser",  {*/}
                        {/*        method: 'GET',*/}
                        {/*        headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},*/}
                        {/*    }).then((response) => response.text()).then(res => {*/}
                        {/*        if(res === "admin")*/}
                        {/*            window.location = "/admin"*/}
                        {/*        else*/}
                        {/*            window.location = "/user"*/}
                        {/*    })*/}
                        {/*}}>*/}
                        {/*    <img src = {user} alt = "user"></img>*/}
                        {/*</button>*/}
                    </div>
                </nav>
            </div>
    )
}
// class  MainHeader extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             resultsOfSearch : []
//         }
//     }
//
//     componentDidMount() {
//         switchTheme(localStorage.getItem('theme'))
//     }
//
//     render() {
//         const renderUserImage = () => {
//             if(localStorage.getItem('jwt')) {
//                 return <> {
//                 }
//                 </>
//             }
//         }
//
//         const renderLogOut = () => {
//             if(localStorage.getItem('jwt')!="") {
//                 return <> {
//
//                 }</>
//             }
//             else {
//                 return <> {
//                     <button className="btn custom-button sign-in-button"
//                             onClick = {()=> {window.location ="/authPage"}
//                             }>Войти</button>
//                 }</>
//             }
//         }
//     }
// }


export default MainHeader