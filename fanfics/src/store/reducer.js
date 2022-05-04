import {combineReducers} from "redux"
import {mainSlice} from "./slices/mainSlice";
import {worksSlice} from "./slices/worksSlice";
import {bookSlice} from "./slices/bookSlice";
import {chapterSlice} from "./slices/chapterSlice";
import {userSlice} from "./slices/userSlice";

let rootReducer = combineReducers({
    main: mainSlice.reducer,
    works: worksSlice.reducer,
    chapter: chapterSlice.reducer,
    book: bookSlice.reducer,
    user: userSlice.reducer,
})

export {rootReducer}