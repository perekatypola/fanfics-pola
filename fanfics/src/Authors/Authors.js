import React, {useEffect, useState} from "react";
import CommentArea from "../CommentArea/CommentArea";
import {useDispatch, useSelector} from "react-redux";
import potter from "../potter.jpeg"
import "./Authors.css"
import {fetchAuthors} from "../store/slices/mainSlice";
import {useHistory} from "react-router-dom";

const Authors = () => {
    const dispatch = useDispatch()
    const authors = useSelector(state => state.main.authors)
    const [searchValue, setValue] = useState('')

    useEffect(() => {
        dispatch(fetchAuthors())
    }, [])

    const history = useHistory()

    const filteredAuthors = authors.filter(author => {
        return author.name.toLowerCase().includes(searchValue)
    })

    return (
        <div className="authors-container">
            <div className="search-container">
                <input placeholder={"Find author"} className="author-search__input"
                onChange={event => setValue(event.target.value)}/>
            </div>
             {
                 filteredAuthors.map(author => {
                     return (
                         <a onClick={() => {
                             history.push("/user/" + author.id)
                         }}>
                             <div className="author-card">
                                 <img className="user-poster" src={potter}/>
                                 <div className="user-name">{author.name}</div>
                            </div>
                         </a>
                     );
                 })
             }
        </div>
    );
}

export default Authors;