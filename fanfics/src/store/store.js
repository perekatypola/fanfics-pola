import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "@redux-devtools/extension";
import {setInfoOpen} from "./slices/userSlice";

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
  ))

store.dispatch(setInfoOpen())

export {store}