import React from 'react';
import '../App.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Products from "./Products";
import Home from "./Home";
import Pets from "./Pets";
import Login from "./authentication/Login";
import Product from "./Product";

const Navbar = () => {
    return (
        <Router>
            <div className="main-navbar">
                <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-lg">
                    <div className="container">
                        <a className="navbar-brand fw-bold" href="/">
                            <button className="bbutton">
                                ZOOmart
                            </button>
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#showContent" aria-controls="showContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="showContent">
                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <li className="nav-item mx-5">
                                    <a className="nav-link" aria-current="page" href="/">Home</a>
                                </li>
                                <li className="nav-item mx-5">
                                    <a className="nav-link" href="/products">Products</a>
                                </li>
                                <li className="nav-item mx-5">
                                    <a className="nav-link" href="/pets">Pets</a>
                                </li>
                                <li className="nav-item mx-5">
                                    <a className="nav-link" href="/orders">Orders</a>
                                </li>

                            </ul>
                            {/*<form className="d-flex">*/}
                            {/*    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                            {/*        <button className="btn btn-outline-success" type="submit">Search</button>*/}
                            {/*</form>*/}
                            <div className="buttons">
                                <a href="/auth" className="btn btn-outline-primary">
                                    <i className="fa fa-sign-in me-1"> </i>Login
                                </a>
                                <a href="" className="btn btn-outline-dark ms-2">
                                    <i className="fa fa-shopping-cart me-1"> </i>Cart
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <Routes>
                <Route path="/products/:id" element={<Product />}/>
                <Route path="/products" element={<Products />}/>
                <Route path="/" element={<Home />}/>
                <Route path="/pets" element={<Pets />}/>
                <Route path="/auth" element={<Login />}/>

            </Routes>
        </Router>
    );
}

export default Navbar;