import React from "react";
import './MainPage.css'
import RecentWorks from '../RecentWorks/RecentWorks'
import {switchTheme} from "../App";
import { Draggable, Droppable } from 'react-drag-and-drop'
class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password:'',
            works :[]
        };
    }

    componentDidMount() {
        switchTheme(localStorage.getItem('theme'))
    }

    onDrop(data) {
        console.log(data)
        // => banana
    }

    render() {
        return (
            <div>
                <RecentWorks works = {this.state.works} ></RecentWorks>
            </div>
        );
    }
}

export default MainPage