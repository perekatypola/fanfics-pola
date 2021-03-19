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
      <div data-theme = "light" className = "App light">
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
      </div>
  );
}

const themes = ['light' , 'dark']

export const switchTheme = (themeName) => {
    const app = document.querySelector('.App');

    function applyTheme(themeName) {
        app.classList.remove(app.dataset.theme)
        app.classList.add(themeName);
        app.dataset.theme = themeName;
        localStorage.setItem('theme' , themeName)
    }

    if (themeName) {
        if (!themes.includes(themeName)) {
            throw Error('Unknown theme');
        }
        applyTheme(themeName);
    } else {
        const activeIndex = themes.indexOf(app.dataset.theme);
        const newIndex = (activeIndex + 1) % themes.length;
        applyTheme(themes[newIndex]);
    }
}

export default App;
