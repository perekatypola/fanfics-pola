import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

let fetchCategories = createAsyncThunk(
    'main/fetchCategories',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/categories", {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchGenres = createAsyncThunk(
    'main/fetchGenres',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/genres", {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchFandoms = createAsyncThunk(
    'main/fetchFandoms',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/fandoms", {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchBooks = createAsyncThunk(
    'main/fetchBooks',
    async function(state, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/books/search", {
            method: 'GET',
        })
        let data = await resp.json()
        if(state) {
            if(state.category) {
              dispatch(fetchWorksByCategory(state.category))
            }
            else {
                if(state.tagId) {
                    console.log(state.tagId)
                    dispatch(fetchWorksByTag(state.tagId))
                }
                else {
                    if(state.user) {
                        dispatch(fetchWorksByUser(state.user))
                    }
                    else {
                        dispatch(fetchWorksByFandom(state.fandom))
                    }
                }
            }
        }
        return data
    }
)

let fetchAuthors = createAsyncThunk(
    'main/fetchAuthors',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/users", {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchTags = createAsyncThunk(
    'main/fetchTags',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/tags", {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchWorksByCategory = createAsyncThunk(
    'main/fetchWorksByCategory',
    async function(id, {rejectWithValue, dispatch}) {
        console.log(id)
        const resp = await fetch("http://localhost:8081/books/search?category=" + id, {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchWorksByFandom = createAsyncThunk(
    'main/fetchWorksByFandom',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/books/search?fandom=" + id, {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchWorksByUser = createAsyncThunk(
    'main/fetchWorksByUser',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/books/search?user=" + id, {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let fetchWorksByTag = createAsyncThunk(
    'main/fetchWorksByTag',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/books/search?tag=" + id, {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let mainSlice = createSlice({
        name: 'main',
        initialState: {theme: 'light', categories: [], fandoms: [], books: [], authors: [], genres:[], tags: [{id: "text", text: "text"}]},
        reducers: {
            applyTheme(state) {
                if (localStorage.getItem("darkTheme") == "1") {
                    const app = document.querySelector('.App');
                    app.classList.remove(app.dataset.theme)
                    app.classList.add("dark");
                    app.dataset.theme = "dark";
                    state.theme = "dark";
                }
            },
            changeTheme(state) {
                let themeName;
                if (state.theme == "dark") {
                    themeName = "light"
                    localStorage.setItem("darkTheme", "0")
                } else {
                    themeName = "dark"
                    localStorage.setItem("darkTheme", "1")
                }
                const app = document.querySelector('.App');
                app.classList.remove(app.dataset.theme)
                app.classList.add(themeName);
                app.dataset.theme = themeName;
                state.theme = themeName;
            },
        },
        extraReducers: {
            [fetchCategories.fulfilled]: (state, action) => {
                state.categories = action.payload
            },
            [fetchFandoms.fulfilled]: (state, action) => {
                state.fandoms = action.payload
            },
            [fetchBooks.fulfilled]: (state, action) => {
                state.books = action.payload
            },
            [fetchAuthors.fulfilled]: (state, action) => {
                state.authors = action.payload
            },
            [fetchWorksByCategory.fulfilled]: (state, action) => {
                state.books = action.payload
            },
            [fetchWorksByFandom.fulfilled]: (state, action) => {
                state.books = action.payload
            },
            [fetchGenres.fulfilled]: (state, action) => {
                state.genres = action.payload
            },
            [fetchTags.fulfilled]: (state, action) => {
                state.tags = action.payload
            },
            [fetchWorksByTag.fulfilled]: (state, action) => {
                state.books = action.payload
            },
            [fetchWorksByUser.fulfilled]: (state, action) => {
                state.books = action.payload
            },
        }
    }
)

export const {applyTheme, changeTheme} = mainSlice.actions;
export {mainSlice}
export {fetchCategories}
export {fetchFandoms}
export {fetchBooks}
export {fetchAuthors}
export {fetchWorksByCategory}
export {fetchWorksByFandom}
export {fetchGenres}
export {fetchTags}
export {fetchWorksByTag}
export {fetchWorksByUser}