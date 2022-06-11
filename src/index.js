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
export const base_url = "http://zoo-store-front.vercel.app";
export const client_id = "422824741850-v7076qld2jlq73egm0302u3og576v4b1.apps.googleusercontent.com";
export const wooppay_token = "eyJraWQiOiJrZXkxIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJ3b29wcGF5LmNvbSIsImF1ZCI6Indvb3BwYXkuY29tIiwiZXhwIjoxOTcwMTI5NzY5LCJqdGkiOiJmNU90VzNNcURtdThFOGFCZWRxbzBBIiwiaWF0IjoxNjU0NTEwNTY5LCJuYmYiOjE2NTQ1MTA1NjksInN1YiI6Im1lcmNoVmlrdG9yX3pvb3N0b3JlIiwidXNlcklkIjoyMTEzOTQyMSwidG9rZW5UeXBlIjoiV0VCIiwiZGV2aWNlSWQiOiJzYXR1X21lcmNoVmlrdG9yX3pvb3N0b3JlIiwiZGVzY3JpcHRpb24iOiJab29TdG9yZUFQSSJ9.Pj51DyKST0Fstg5VtTGb-2HzsmoFJ2dLuA53uqdfb52G3nttQfvYoCat57CAc3oVEGSQRVtocN7iInzrAHbbjg";
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

