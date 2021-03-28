import React from "react";
import {addComment} from '../global'
import {switchTheme} from "../App";
class  Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            text:''
        }
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
    }

    render() {
        return (
            <div className="form-outline comment-box border">
                <label>Имя:</label>
                <input className="name form-control" id= "comment-user-name"
                onChange={event=>{
                    this.setState({'name': event.target.value})
                }}/>
                <label>Комментарий:</label>
                <textarea className="form-control comments" rows="4" id = "comment-text"
                          onChange={event=>{
                              this.setState({'text': event.target.value})
                          }}> </textarea>
                <button className="btn btn-outline custom-button send"
                onClick = {()=> {
                    document.getElementById("comment-user-name").value = ""
                    document.getElementById("comment-user-name").value = ""
                        addComment(this.state.name , this.state.text , this.props.book)
                }}>Отправить</button>
            </div>
        );
    }
}

export default Comment;