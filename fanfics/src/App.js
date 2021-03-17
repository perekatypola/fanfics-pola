import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import MainHeader from './MainHeader/MainHeader'
import BookPage from './BookPage/BookPage'
import Works from './Fanfics/Works'
import ChapterPage from'./ChapterPage/ChapterPage'
import React from "react";
import Register from "./Register/Register";
import Auth from "./Auth/Auth";
import MainPage from "./MainPage/MainPage";
import UserPage from "./UserPage/UserPage";
import CreateBook from "./createBook/CreateBook";
import CreateChapters from "./CreateChapters/CreateChapters";
function App() {

  return (

      <Router>
        <Switch>
            <Route path="/bookPage">
                <BookPage/>
            </Route>
            <Route path="/works">
                <Works/>
            </Route>
            <Route path="/chapterPage">
                <ChapterPage/>
            </Route>
            <Route path = "/authPage">
                <Auth/>
            </Route>
            <Route path="/regPage">
                <Register/>
            </Route>
            <Route path="/user">
                <UserPage/>
            </Route>
            <Route path="/createBook">
                <CreateBook/>
            </Route>
            <Route path="/createChapters">
                <CreateChapters/>
            </Route>
          <Route path="/">
            <MainPage/>
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
