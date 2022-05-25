import React, {useState} from "react";
import {addComment} from '../global'
import './ErrorPage.css'

const ErrorPage = (props) => {
    const [text, setText] = useState()

    return (
            <div className="main-page__page">
                <div className="error-message">Error on server</div>
            </div>
        );
}

export default ErrorPage;