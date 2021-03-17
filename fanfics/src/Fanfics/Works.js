import React from "react";
import ReactStars from "react-rating-stars-component";
import './Works.css'
import {Link} from 'react-router-dom';
import MainHeader from "../MainHeader/MainHeader";
import CommentArea from "../CommentArea/CommentArea";
class Works extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            works: []
        };
    }

    componentDidMount() {
        fetch("https://fanfics-pola.herokuapp.com/loadWorks",  {
            method: 'GET',
            headers:{'Content-Type': 'application/json'}
        }).then((response) => response.json()).then(res => {
            console.log(res)
            this.setState({works:res})
        })
    }

    render() {
        const renderWorks = () => {
            return <>
                {
                    this.state.works.map(work =>
                        <React.Fragment>
                            <div className = "cell">
                                <tr>
                                    <td>
                                        <Link to = "/bookPage" onClick = {() => {localStorage.setItem('curBook' ,work.book_name)}}>{work.book_name}</Link>
                                    </td>
                                    <td>
                                        <ReactStars   class="text-right" />
                                    </td>
                                </tr>
                            </div>
                        </React.Fragment>
                    )}
            </>
        }

        return (
            <div className="background">
               <MainHeader></MainHeader>
                <div className="container">
                        <table className="table">
                            <tbody>
                            {renderWorks()}
                            </tbody>
                        </table>
                </div>
                </div>
        );
    }
}

export default Works;