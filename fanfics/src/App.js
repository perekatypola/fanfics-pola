import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route, withRouter,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import MainHeader from './MainHeader/MainHeader'
import BookPage from './BookPage/BookPage'
import Works from './Fanfics/Works'
import ChapterPage from'./ChapterPage/ChapterPage'
import React, {useEffect} from "react";
import Register from "./Register/Register";
import Auth from "./Auth/Auth";
import MainPage from "./MainPage/MainPage";
import UserPage from "./UserPage/UserPage";
import CreateBook from "./createBook/CreateBook";
import CreateChapters from "./CreateChapters/CreateChapters";
import Admin from "./Admin/Admin";
import EditBook from "./EditBook/EditBook";
import EditChapter from "./EditChapter/EditChapter";
import {Provider, useDispatch} from 'react-redux';
import {store} from "./store/store";
import {applyTheme} from "./store/slices/mainSlice";
import Authors from "./Authors/Authors";
                import { BrowserRouter} from 'react-router-dom';
import Settings from "./Settings/Setting";
import RecentWorks from "./RecentWorks/RecentWorks";
import ErrorPage from "./Admin/Admin";
import {useTranslation} from "react-i18next";
function App() {
    const {t} = useTranslation()
    return (
        <Provider store={store}>
            <div data-theme = "light" className = "App light main-page">
                    <MainHeader></MainHeader>
                    <div className="main-page__content">
                        <div className="bookmark-container">
                            <div className="bookmark"
                                 onClick={() => {
                                    window.location="/authors"
                                 }}>
                                <span>{t('Authors')}</span>
                            </div>
                            <div className="bookmark"
                                onClick={() => {
                                    window.location="/works"
                                }}>
                                <span>{t('Fanfics')}</span>
                            </div>
                            <div onClick={event => {
                            }}></div>
                        </div>
                        <div className="main-page__page">
                              <div>
                                  <Router>
                                      <Switch>
                                          <Route path="/bookPage/:id">
                                              <BookPage/>
                                          </Route>
                                          <Route path="/works">
                                              <Works/>
                                          </Route>
                                          <Route path="/error">
                                              <ErrorPage/>
                                          </Route>
                                          <Route path="/chapterPage/:bookId/:id">
                                              <ChapterPage/>
                                          </Route>
                                          <Route path="/recent">
                                              <RecentWorks/>
                                          </Route>
                                           <Route path="/authors">
                                              <Authors/>
                                          </Route>
                                          <Route path="/editChapter/:id">
                                              <EditChapter/>
                                          </Route>
                                          <Route path="/user/:id">
                                              <UserPage/>
                                          </Route>
                                          <Route path="/settings">
                                              <Settings></Settings>
                                          </Route>
                                          <Route path="/createBook">
                                              <CreateBook/>
                                          </Route>
                                          <Route path="/editBook/:id">
                                              <EditBook/>
                                          </Route>
                                          <Route path="/admin">
                                              <Admin/>
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
                            <Auth/>
                            <Register/>
                        </div>
                    </div>
            </div>
          </Provider>
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
