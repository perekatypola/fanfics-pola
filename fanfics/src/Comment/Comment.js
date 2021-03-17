import React from "react";
import {addComment} from '../global'
class  Comment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name:'',
            text:''
        }
    }

    componentDidMount() {}

    render() {
        return (
            <div className="form-outline comment-box border">
                <label>Имя:</label>
                <input className="name form-control"
                onChange={event=>{
                    this.setState({'name': event.target.value})
                }}/>
                <label>Комментарий:</label>
                <textarea className="form-control comments" rows="4"
                          onChange={event=>{
                              this.setState({'text': event.target.value})
                          }}> </textarea>
                <button className="btn btn-outline custom-button send"
                onClick = {()=> {
                        addComment(this.state.name , this.state.text , this.props.book)
                }}>Отправить</button>
            </div>
        );
    }
}

export default Comment;