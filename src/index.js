import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {persistor, store} from "./redux/store";
import {BrowserRouter as Router} from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react'
import NavbarMain from "./component/Navbar";
import Popper from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from "./component/Footer";
import 'bootstrap-icons/font/bootstrap-icons.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <NavbarMain/>
                    <App />
                    <Footer/>
                </Router>
            </PersistGate>
        </Provider>
);

export const api_link = "https://api-zoo-app.herokuapp.com/api/v1";
export const client_id = "422824741850-v7076qld2jlq73egm0302u3og576v4b1.apps.googleusercontent.com";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

