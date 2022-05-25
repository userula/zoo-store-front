import React from 'react';
import Products from "./Products";

const Home = () => {
    return (
        <div className="hero">
            <div className="card bg-dark text-dark border-0 main-page">
                <img src="/assets/bg_pets.png" className="card-img bg-image" alt="Background" height="1050"/>
                    <div className="card-img-overlay d-flex flex-column mt-xxl-5">
                        <div className="container">
                            <h5 className="card-title display-3 fw-bolder mb-0">NEW ZOO-GOODS</h5>
                            <p className="card-text lead fs-2">CHECK OUT ALL THE TRENDS</p>
                        </div>
                    </div>
            </div>
        </div>

    );
}

export default Home;