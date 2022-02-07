
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import store from "./redux/index";
import { Provider } from "react-redux";
import {unregister} from "./serviceWorker"

ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
unregister();