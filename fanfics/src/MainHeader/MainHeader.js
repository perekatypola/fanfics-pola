import user from '../user.png'
import book from '../book.png'
import './MainHeader.css'

import React from "react";

class  MainHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const renderUserImage = () => {
            if(localStorage.getItem('jwt')!="") {
                return <> {
                    <button className="user-button"
                    onClick = {()=> {
                        window.location = "/user"
                    }}>
                        <img src = {user} alt = "user"></img>
                    </button>
                }
                </>
            }
        }

        const renderAdd = () => {
            if(this.props.loggedIn===true) {
                return <> {
                    <button className="user-button"
                            onClick = {()=> {
                                window.location = "/createBook"
                            }}>
                        <img src = {book} alt = "user"></img>
                    </button>
                }
                </>
            }
        }
        const renderLogOut = () => {
            if(localStorage.getItem('jwt')!="") {
                return <> {
                    <button className="btn btn-outline custom-button sign-in-button"
                            onClick = {() =>{window.location = "/"
                            localStorage.setItem('jwt' , "")}
                    }>LogOut</button>
                }</>
            }
            else {
                return <> {
                    <button className="btn btn-outline custom-button sign-in-button"
                            onClick = {()=> {window.location ="/auth"}
                            }>Sign In</button>
                }</>
            }
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="header">
                        {renderUserImage()}
                        <label onClick={() => {
                            window.location = "/"
                        }} className="application-name">Мордор</label>
                        <form className="form mr-auto">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline custom-button" type="submit"
                                    onClick={()=> {
                                        fetch("http://localhost:8080/search",  {
                                            method: 'GET',
                                            headers:{'Content-Type': 'application/json' , 'searchText' : "sss"}
                                        }).then((response) => response.json()).then(res => {
                                            console.log(res)
                                        })
                                    }}
                            >Search</button>
                        </form>
                        {renderLogOut()}
                        {renderAdd()}
                    </div>
                </nav>
            </div>
        );
    }
}


export default MainHeader