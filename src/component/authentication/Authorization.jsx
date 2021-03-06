import React from "react";
// import '../../css/authorization.scss';
import './auth';

const Authorization = () => {

    return (
        <>
            <p className="tip">Click on button in image container</p>
            <div className="cont">
                <div className="form sign-in">
                    <h2>Welcome back,</h2>
                    <label>
                        <span>Email</span>
                        <input type="email"/>
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password"/>
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" className="submit">Sign In</button>
                    <button type="button" className="fb-btn">Connect with <span>facebook</span></button>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">
                            <h2>New here?</h2>
                            <p>Sign up and discover great amount of new opportunities!</p>
                        </div>
                        <div className="img__text m--in">
                            <h2>One of us?</h2>
                            <p>If you already has an account, just sign in. We've missed you!</p>
                        </div>
                        <div className="img__btn">
                            <span className="m--up">Sign Up</span>
                            <span className="m--in">Sign In</span>
                        </div>
                    </div>
                    <div className="form sign-up">
                        <h2>Time to feel like home,</h2>
                        <label>
                            <span>Name</span>
                            <input type="text"/>
                        </label>
                        <label>
                            <span>Email</span>
                            <input type="email"/>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password"/>
                        </label>
                        <button type="button" className="submit">Sign Up</button>
                        <button type="button" className="fb-btn">Join with <span>facebook</span></button>
                    </div>
                </div>
            </div>

            <a href="https://dribbble.com/shots/3306190-Login-Registration-form" target="_blank" className="icon-link">
                <img src="http://icons.iconarchive.com/icons/uiconstock/socialmedia/256/Dribbble-icon.png" alt=""/>
            </a>
            <a href="https://twitter.com/NikolayTalanov" target="_blank" className="icon-link icon-link--twitter">
                <img src="https://cdn1.iconfinder.com/data/icons/logotypes/32/twitter-128.png" alt=""/>
            </a>
        </>
    );
}

export default Authorization;