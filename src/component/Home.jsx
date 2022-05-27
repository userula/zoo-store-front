import React from 'react';
import Products from "./Products";

const Home = () => {
    return (
        <>
            <div className="h-50">
                <h1>Hello</h1>
            </div>
            <div className="hero mt-xxl-5">
                <div className="card bg-white text-dark border-0 main-page">
                    <img src="/assets/main.png" className="card-img bg-image mt-xxl-5" alt="Background" height="100%"/>
                    <div className="card-img-overlay d-flex flex-column mt-xxl-5">
                        <div className="container">
                            <h5 className="card-title display-3 fw-bolder mb-0">EVERYTHING YOU NEED</h5>
                            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Home;