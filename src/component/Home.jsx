import React from 'react';
import Products from "./Products";
import Slider from "./Slider";
import Footer from "./Footer";

const Home = () => {
    return (
        <>
            <div className="homepage">
                {/*<div className="text-dark border-0">*/}
                {/*    /!*<div className="h-100"></div>*!/*/}
                {/*    /!*<img src="/assets/backgr.jpg" className="card-img bg-image mt-xxl-5" alt="Background" height="100%"/>*!/*/}
                {/*    <div className="mt-xxl-5">*/}
                {/*        <div className="container">*/}
                {/*            <h5 className="display-3 fw-bolder">EVERYTHING YOU NEED</h5>*/}
                {/*            <p className="">CHECK OUT ALL THE TRENDS</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Slider />
                <Footer/>
            </div>
        </>

    );
}

export default Home;