import React from "react";
import './CommentArea.css'
import potter from "../potter.jpeg"

class Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="comment-area">
                <img className="user-poster comment-poster" src={potter}/>
                <div className="form-outline border comment">
                    <p className="comment-username">{this.props.name}</p>
                    <p className="comment-text">{this.props.text}</p>
                </div>
            </div>
        );
    }
}

export default Comment;