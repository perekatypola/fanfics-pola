import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from '@lyket/react';
import {hideNodesWithUserStatusName} from "../src/helpers.js"
import reportWebVitals from './reportWebVitals';
import './localization/i18r';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider apiKey="70a14b903839b6cc6206ba235b0ca3">
          <React.StrictMode>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
          </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
