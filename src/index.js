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
import Footer from "./component/Footer";


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

export const api_link = "https://api-zoo-app.herokuapp.com/api/v1"
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

