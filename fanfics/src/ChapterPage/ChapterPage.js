import React from "react";
import './ChapterPage.css'
import {chaptersNav} from '../global'
import MainHeader from '../MainHeader/MainHeader'
import CommentArea from "../CommentArea/CommentArea";
import ReactMarkdown from 'react-markdown'
import {switchTheme} from "../App";
class  ChapterPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            book: localStorage.getItem('curBook'),
            chapterName:localStorage.getItem('curChapter'),
            chapter: {},
            text:'',
            chapters :[]
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
        fetch("https://fanfics-pola.herokuapp.com/loadChapters",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json' , 'chapterName' : this.state.chapterName, 'bookName' : this.state.book }
        }).then((response) => response.json()).then(res => {
            console.log(res)
            res.forEach(ch => {
                if(ch.chapter_name === this.state.chapterName) {
                    this.setState({chapter:ch})
                    this.setState({text:ch.text})
                }
            })
            this.setState({chapters:res})
            console.log(res)
        })
    }

    render() {
        const navigateRight = () => {
            console.log("right")
            this.state.chapters.forEach(ch => {
                if(ch.chapter_name === this.state.chapterName && this.state.chapters.indexOf(ch)!= this.state.chapters.length - 1) {
                    this.setState({chapter:this.state.chapters[this.state.chapters.indexOf(ch)+1]})
                    this.setState({chapterName:this.state.chapter.chapter_name})
                    this.setState({text : this.state.chapter.text})
                }
            })
        }

        const navigateLeft = () => {
            console.log("left")
            this.state.chapters.forEach(ch => {
                if(ch.chapter_name === this.state.chapterName && this.state.chapters.indexOf(ch)!= 0) {
                    this.setState({chapter:this.state.chapters[this.state.chapters.indexOf(ch)-1]})
                    this.setState({chapterName:this.state.chapter.chapter_name})
                    this.setState({text : this.state.chapter.text})
                }
            })
        }

        return (
            <div className="background">
                <MainHeader></MainHeader>
                <div className = "buttons">
                    {/*{drawNavButtons()}*/}
                    <button className="btn btn-outline custom-button content-button" id = "left"
                            onClick = {() => {navigateLeft()}}>Назад</button>
                    <button className="btn btn-outline custom-button content-button"
                            onClick = {() => {window.location = "/bookPage"}}>Содержание</button>
                    <button className="btn btn-outline custom-button content-button" id = "right"
                            onClick = {() => {navigateRight()}}>Вперед</button>
                </div>
                <div className="chapterWithNav">
                    <div className="chapter">
                        <div className="chapter-content">
                            <div>
                                <div className="card-header text-center">
                                    <p className="h5">{this.state.chapterName}</p>
                                </div>
                                <div className="card-body">
                                    <ReactMarkdown>{this.state.text}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="button-box">
                        <div className = "buttons">
                            {/*{drawNavButtons()}*/}
                            <button className="btn btn-outline custom-button content-button" id = "left"
                                    onClick = {() => {navigateLeft()}}>Назад</button>
                            <button className="btn btn-outline custom-button content-button"
                                    onClick = {() => {window.location = "/bookPage"}}>Содержание</button>
                            <button className="btn btn-outline custom-button content-button" id = "right"
                                    onClick = {() => {navigateRight()}}>Вперед</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChapterPage;