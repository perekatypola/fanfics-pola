import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from '@lyket/react';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider apiKey="70a14b903839b6cc6206ba235b0ca3">
          <React.StrictMode>
            <App />
          </React.StrictMode>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
