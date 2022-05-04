import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchCategories, fetchFandoms} from "./mainSlice";

let fetchRecentBooks = createAsyncThunk(
    'works/fetchRecentBooks',
    async function(id, {rejectWithValue, dispatch}) {
        const resp = await fetch("http://localhost:8081/books/recent", {
            method: 'GET',
        })
        let data = await resp.json()
        return data
    }
)

let worksSlice = createSlice({
        name: 'works',
        initialState: {works: [], topWorks: []},
        reducers: {
        },
        extraReducers: {
            [fetchRecentBooks.fulfilled]: (state, action) => {
                state.topWorks = action.payload
            },
        }
    }
)

export const {setWorks} = worksSlice.actions;
export {worksSlice}
export {fetchRecentBooks}