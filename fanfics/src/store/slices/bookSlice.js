import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

let fetchBookInfo = createAsyncThunk(
    'book/fetchBookInfo',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/books/"+ id, {
            method: 'GET',
        })
        let data = await resp.json()
        console.log(data)
        return data
    }
)

let fetchChapters = createAsyncThunk(
    'book/fetchChapters',
    async function(id, {rejectWithValue, dispatch}) {
            const resp = await fetch("http://localhost:8081/chapters/book/" + id, {
            method: 'GET'
            })
            let data = await resp.json()
            return data
    }
)

let fetchComments = createAsyncThunk(
    'book/fetchComments',
    async function(id, {rejectWithValue, dispatch}) {
            const resp = await fetch("http://localhost:8081/comments/book/" + id, {
            method: 'GET'
            })
            let data = await resp.json()
            return data
    }
)

let bookSlice = createSlice({
        name: 'book',
        initialState: {
            'bookName': "bookName",
            "description": "",
            'chapters': [],
            'currentChapter': 'name',
            'book': {
                "fandom": {
                    "name": ''
                },
                "genre": {
                    "name": ''
                },
                "category": {
                    "name": ''
                },
                "tags": []
            },
            "comments": []
        },
        reducers: {
            setBookName(state, payload) {
                state.bookName = state.book.name;
            },
            setLike(state) {
                state.rating = state.rating + 1;
            },
            takeLike(state) {
                state.rating = state.rating - 1;
            },
            setChapters(state, payload) {
                state.chapters = payload.payload
            },
            setCurrentChapter(state, payload) {
                state.currentChapter = payload.payload
            },
            setBookInfo(state, payload) {
                console.log(payload.payload)
                state.book = payload.payload
            }
        },
        extraReducers: {
            [fetchBookInfo.fulfilled]: (state, action) => {
                state.book= action.payload
            },
            [fetchChapters.fulfilled]: (state, action) => {
                state.chapters = action.payload;
            },
            [fetchChapters.rejected]: (state, action) => {
                console.log(action)
            },
            [fetchComments.fulfilled]: (state, action) => {
                state.comments = action.payload
            },
          },
    }
)

export const {setBookName, setBookInfo, setChapters, setLike, takeLike} = bookSlice.actions;
export {fetchBookInfo, fetchChapters, fetchComments}
export {bookSlice}