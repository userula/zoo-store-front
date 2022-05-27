import React from 'react';
import '../App.css';
import {BrowserRouter as Router, Routes} from "react-router-dom";

const Footer = () => {
    return (
        <Router>
            <footer id="sticky-footer" className="flex-shrink-0 py-4 bg-white shadow-lg footer">
                <div className="container text-center">
                    <small>Copyright &copy; ZOOmart</small>
                </div>
            </footer>
            <Routes>
                {/*<Route path="/products" element={<Products />}/>*/}
                {/*<Route path="/" element={<Home />}/>*/}
                {/*<Route path="/pets" element={<Pets />}/>*/}
                {/*<Route path="/auth" element={<Login />}/>*/}


            </Routes>
        </Router>
    );
}

export default Footer;