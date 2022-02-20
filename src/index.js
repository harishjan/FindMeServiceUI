
import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import store from "./redux/index";
import { Provider } from "react-redux";
import {unregister} from "./serviceWorker"
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: 'top center',
    timeout: 5000,
    offset: '30px',
    transition: 'scale'
  }
ReactDOM.render(
    <AlertProvider template={AlertTemplate} {...options}>
    <Provider store={store}>
    <App />
  </Provider>
  </AlertProvider>,
  document.getElementById('root')
);
unregister();