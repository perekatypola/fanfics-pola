import React from "react";
import './CommentArea.css'
class  Comment extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                        <div className="form-outline border comment">
                            <p className="username">{this.props.username}</p>
                            <p className="comment-text">{this.props.text}</p>
                        </div>
            </div>
        );
    }
}

export default Comment;