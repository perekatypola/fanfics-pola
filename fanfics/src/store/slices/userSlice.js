import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

let fetchUserInfo = createAsyncThunk(
    'user/fetchUserInfo',
    async function(id, {rejectWithValue, dispatch}) {
            const resp = await fetch("http://localhost:8081/users/" + id, {
            method: 'GET'
            })
            let data = await resp.json()
        console.log(data)
            return data
    }
)

let userSlice = createSlice({
        name: 'user',
        initialState: {
            'user': {},
            'isInfoOpen': true,
        },
        reducers: {
            setInfoOpen(state, payload) {
                state.isInfoOpen = payload.action;
            },
        },
        extraReducers: {
            [fetchUserInfo.fulfilled]: (state, action) => {
                state.user = action.payload
            },
          },
    }
)

export {userSlice}
export const {setInfoOpen} = userSlice.actions
export {fetchUserInfo}