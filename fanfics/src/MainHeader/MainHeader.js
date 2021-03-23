import user from '../user.png'
import book from '../book.png'
import './MainHeader.css'
import {switchTheme} from "../App";

import React from "react";
import Tooltip from "react-bootstrap/Tooltip";

class  MainHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resultsOfSearch : []
        }
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
    }

    render() {
        const renderUserImage = () => {
            if(localStorage.getItem('jwt')) {
                return <> {
                    <button className="user-button"
                    onClick = {()=> {
                        fetch("https://fanfics-pola.herokuapp.com/getUser",  {
                            method: 'GET',
                            headers:{'Content-Type': 'application/json' , 'Auth' : localStorage.getItem('jwt')},
                        }).then((response) => response.text()).then(res => {
                            if(res === "admin")
                                window.location = "/admin"
                            else
                                window.location = "/user"
                        })
                    }}>
                        <img src = {user} alt = "user"></img>
                    </button>
                }
                </>
            }
        }

        const renderLogOut = () => {
            if(localStorage.getItem('jwt')!="") {
                return <> {
                    <button className="btn custom-button sign-in-button"
                            onClick = {() =>{window.location = "/"
                            localStorage.setItem('jwt' , "")}
                    }>Выйти</button>
                }</>
            }
            else {
                return <> {
                    <button className="btn custom-button sign-in-button"
                            onClick = {()=> {window.location ="/authPage"}
                            }>Войти</button>
                }</>
            }
        }
        return (
            <div className = "MainHeader">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="header">
                        {renderUserImage()}
                        <label onClick={() => {
                            window.location = "/"
                        }} className="application-name">Мордор</label>
                        <button className="btn btn-outline custom-button" type="submit"
                                onClick={()=> {
                                    switchTheme()
                                }}
                        >Тема</button>
                        <form className="form mr-auto">
                            <input className="form-control mr-sm-2 search" type="search" placeholder="Search" aria-label="Search" onChange = {event => {
                                this.setState({searchText : event.target.value})
                            }}/>
                        </form>
                        <button className="btn custom-button"
                                onClick={()=> {
                                    fetch("https://fanfics-pola.herokuapp.com/search",  {
                                        method: 'POST',
                                        headers:{'Content-Type': 'application/json'},
                                        body: JSON.stringify({searchText: this.state.searchText})
                                    }).then((response) => response.json()).then(res => {
                                        console.log(res.result)
                                        localStorage.setItem('results' ,  JSON.stringify(res.result))
                                        window.location = "/results"
                                    })
                                }}
                        >Поиск</button>
                        {renderLogOut()}
                    </div>
                </nav>
            </div>
        );
    }
}


export default MainHeader