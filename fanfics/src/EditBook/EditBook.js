import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams} from 'react-router-dom';
import './EditBook.css'
import {editBook} from '../global'
import edit from "../edit.png";
import add from "../add.png";
import ReactTagInput from "@pathofdev/react-tag-input";
import CryptoJS from "crypto-js";
import {CLIENT_SECRET} from "../config";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories, fetchFandoms, fetchGenres} from "../store/slices/mainSlice";
import {fetchBookInfo, fetchChapters} from "../store/slices/bookSlice";
import Select from "react-select/base";
import Upload from "../Upload/Upload";

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const EditBook = () => {
    const {id} = useParams()
    let nameChanged = false
    const categories = useSelector(state => {
        console.log(state.main.categories)
        return state.main.categories})
    const genres = useSelector(state => state.main.genres)
    const fandoms = useSelector(state => state.main.fandoms)
    const chapters = useSelector(state => state.book.chapters)
    const bookInfo = useSelector(state => {
        return state.book.book
    })
    const [curTags, setTags] = useState(bookInfo.tags)
    const [descr, setDescr] = useState(bookInfo.description)
    const [name, setName] = useState(bookInfo.name)
    const [genre, setGenre] = useState(bookInfo.genre.id)
    const [fandom, setFandom] = useState(bookInfo.fandom.id)
    const [category, setCategory] = useState(bookInfo.category.id)

    const history = useHistory()

    const findId = (array, name) => {
        const el = array.find(el => el.name == name)
        return el.id
    }

    const upload = () => {
        let bId = "poster"+ id
        if(!nameChanged) {
            return <Upload id={bId}></Upload>
        }
        else {
            return <Upload id={bId} changed={true}></Upload>
        }

    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchGenres())
        dispatch(fetchFandoms())
        dispatch(fetchBookInfo(id))
        dispatch(fetchChapters(id))
    }, [])

        return (
            <div className="EditBook">
                <div className="card-box">
                        <div className="content">
                            <div className="book__creation">
                            <h3>Редактирование книги</h3>
                            <div className="settings-container">
                                <div className="settings-info__row">
                                    <strong>Категория:</strong>
                                    <select defaultValue={bookInfo.category.name} onChange={event => {
                                        const id = findId(categories, event.target.value)
                                        setCategory(id)
                                    }}>{
                                        categories.map(category => {
                                            if(category.name == bookInfo.category.name)
                                                return (<option selected="selected">{category.name}</option>);
                                            else
                                                return (<option>{category.name}</option>);
                                        })
                                    }</select>
                                </div>
                                <div className="settings-info__row">
                                    <strong>Жанр:</strong>
                                    <select defaultValue={bookInfo.genre.name} onChange={event => {
                                        const id = findId(genres, event.target.value)
                                        setGenre(id)}}>{
                                        genres.map(genre => {
                                            if(genre.name == bookInfo.genre.name)
                                                return (<option selected="selected">{genre.name}</option>);
                                            else
                                                return (<option>{genre.name}</option>);
                                        })
                                    }</select>
                                </div>
                                <div className="settings-info__row">
                                    <strong>Фандом:</strong>
                                    <select defaultValue={bookInfo.fandom.name} onChange={event => {
                                        const id = findId(fandoms, event.target.value)
                                        setFandom(id)}}>{
                                        fandoms.map(fandom => {
                                            if(fandom.name == bookInfo.fandom.name)
                                                return (<option selected="selected">{fandom.name}</option>);
                                            else
                                                return (<option>{fandom.name}</option>);
                                        })
                                    }</select>
                                </div>
                                <div className="settings-info__row">
                                    <strong>Картинка:</strong>
                                    {upload()}
                                </div>
                                <div className="settings-info__row">
                                    <strong>Тэги:</strong>
                                    <ReactTagInput className = "tags" tags={curTags}
                                                   editable={true}
                                                    readOnly={false}
                                                    onChange={(newTags) => {
                                                        setTags(newTags)}}/>
                                </div>
                                <div className="settings-info__row">
                                    <strong>Название:</strong>
                                    <textarea defaultValue={bookInfo.name} onChange={event => {
                                        setName(event.target.value)
                                        nameChanged=true
                                    }}/>
                                </div>
                                <div className="settings-info__row">
                                    <strong>Описание:</strong>
                                    <textarea defaultValue={bookInfo.description} onChange={event => {
                                        setDescr(event.target.value)
                                    }}/>
                                </div>
                                 <div className="chapters-edit">
                                    <ol>
                                        {chapters.map(chapter => {
                                                return (
                                                    <li className="chapter-link">
                                                        <Link className="h5">
                                                            {chapter.name}</Link>
                                                        <button className="user-button" onClick={() => {
                                                            localStorage.setItem('curChapter', chapter.name)
                                                            history.push("/editChapter/" + chapter.id)
                                                        }
                                                        }>
                                                            <img className="edit-button" src={edit} alt="edit"></img>
                                                        </button>
                                                    </li>
                                                );
                                            }
                                        )}
                                        <li>
                                            <button className = "user-button"
                                            onClick = {() => {
                                                window.location = "/createChapters/" + id
                                                localStorage.setItem('creatingBook' , this.state.header)
                                            }}>
                                                <img className = "edit-button" src = {add} alt = "add" ></img>
                                            </button>
                                        </li>
                                    </ol>
                                </div>
                            <button className = "save-button btn custom-button" onClick ={() => {
                                editBook(localStorage.getItem("curUser"), name , descr , curTags , id ,genre , fandom, category)
                            }}>Сохранить</button>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
        );

}
const delimiters = [KeyCodes.comma, KeyCodes.enter];
// class  EditBook extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             header:localStorage.getItem('curBook') ,
//             topic: 'Романтика',
//             chaptersList: [{chapter_name: 'First'} , {chapter_name : 'Second'} , {chapter_name : 'Second'},{chapter_name : 'Second'},{chapter_name : 'Second'},{chapter_name : 'Second'}],
//             chaptersNames: '',
//             curTags:[],
//             suggestions :[],
//             tags: [] ,
//             newTitle:'',
//             newDescr: '',
//             description:'' ,
//             topics:[] ,
//             newTopic: ''
//         };
//         this.handleDelete = this.handleDelete.bind(this);
//         this.handleAddition = this.handleAddition.bind(this);
//     }
//
//     componentDidMount() {
//         switchTheme(localStorage.getItem('theme'))
//         fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({book_name: this.state.header})
//         }).then((response) => response.json()).then((res) => {
//             console.log(res)
//             this.setState({chaptersList:res})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/loadTopics", {
//             method: 'GET',
//             headers: {'Content-Type': 'application/json','Auth' : localStorage.getItem('jwt')}
//         }).then((response) => response.json()).then(res => {
//             console.log(res)
//             this.setState({topics: res})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/getBookProps",  {
//             method: 'POST',
//             headers:{'Content-Type': 'application/json'},
//             body: JSON.stringify({book_name: this.state.header})
//         }).then((response) => response.json()).then((res) => {
//             this.setState({topic:res.topic})
//             this.setState({description: res.description})
//             this.setState({newDescr: this.state.description})
//             this.setState({newTitle: this.state.header})
//             this.setState({newTopic: this.state.topic})
//         })
//         fetch("https://fanfics-pola.herokuapp.com/loadTags", {
//             method: 'GET',
//             headers: {'Content-Type': 'application/json','Auth' : localStorage.getItem('jwt')}
//         }).then((response) => response.json()).then(res => {
//             this.setState({tags: res})
//             const suggestions = this.state.tags.map(tag => {
//                 return {
//                     id: tag.tag ,
//                     text: tag.tag
//                 }
//             })
//             this.setState({suggestions: suggestions})
//         })
//     }
//
//     handleAddition(tag) {
//         this.state.curTags.push(tag)
//         console.log(this.state.curTags)
//     }
//
//     handleDelete(i) {
//         const { curTags } = this.state;
//         this.setState({
//             curTags: curTags.filter((tag, index) => index !== i),
//         });
//     }
//
//     render() {
//
//     }
//
//
// }

export default EditBook;