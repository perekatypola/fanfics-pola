import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchChapters, setBookInfo} from "./bookSlice";

let fetchChapter = createAsyncThunk(
    'chapter/setChapterInfo',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/chapters/"+ id, {
            method: 'GET',
        })
        let data = await resp.json()
        dispatch(setBookInfo(data.book))
        dispatch(fetchChapters(data.book.id))
        return data
    }
)

let chapterSlice = createSlice({
        name: 'chapter',
        initialState: {
            'chapterName': "",
            'text': '',
            "chapter": {}
        },
        reducers: {
            setChapterName(state, payload) {
                state.chapterName = payload.payload;
            },
            setChapterText(state,payload) {
                state.text = payload.payload;
            },
        },
        extraReducers: {
            [fetchChapter.fulfilled]: (state, action) => {
                state.chapterName = action.payload.name
                state.text = action.payload.text
                state.chapter = action.payload
            },
            [fetchChapter.rejected]: (state, action) => {
                console.log(action)
            },
          },
    }
)

export const {setChapterName, setChapterText} = chapterSlice.actions;
export {fetchChapter}
export {chapterSlice}