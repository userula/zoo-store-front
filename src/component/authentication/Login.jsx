import React, {useState, useEffect} from "react";
import '../../css/login.css';
import $ from 'jquery';
// import 'font-awesome';

let readerView = false;


const openG1 = () => {
    if(readerView === true)
    {
        $('#group1').css('background-color', 'aliceblue');
        $('#group2').css('background-color', 'grey');
        $('.signup').slideToggle();
        $('.login').slideToggle();
        readerView = false;
    }
};

const openG2 = () => {
    if(readerView === false)
    {
        $('#group2').css('background-color', 'aliceblue');
        $('#group1').css('background-color', 'grey');
        $('#group1').css('color', '#673FD7');
        $('.signup').slideToggle();
        $('.login').slideToggle();
        readerView = true;
    }
};

const Login = () => {

    return (
        <>
        <div className="full">
            <div className="h-50">
                <h1>Hello</h1>
            </div>
            <div className="container py-5 mt-xxl-5 mainpage">
                <div className="row">

                    <div className="showPage">
                        <br/><br/>
                        <div className="choose">
                            <button id="group1" className="text-center" onClick={openG1}>Log In</button>
                            <button id="group2" className="text-center" onClick={openG2}>Sign Up</button>
                        </div>

                        <div className="login" id="login">
                            <br/>
                            <div id="h1">
                                <h1>Welcome back</h1>
                                <p id="logerr"></p>
                                <br/>
                                <hr/>
                                <br/>
                                <form>
                                    <input className="loginp" type="email" id="logEmail" placeholder="Email Address"
                                           required autoComplete="on"/>
                                    <br/>
                                    <br/>
                                    <input className="loginp" type="password" id="logPass"
                                           placeholder="Password"/>
                                    <br/>

                                    <br/>
                                    <button className="button button-block" id="logbtn">Log In</button>
                                </form>
                            </div>
                        </div>


                        <div className="signup" id="signup">
                            <br/>
                                <div id="h1">
                                    <h1>Sign Up for Free</h1>
                                    <p id="errormsg"></p>
                                    <br/>
                                    <hr/>
                                    <form>
                                        <input className="loginp" type="name" id="fnameInput"
                                               placeholder="First Name"/>
                                        <br/>
                                        <br/>
                                        <input className="loginp" type="surname" id="lnameInput"
                                               placeholder="Last Name"/>
                                        <br/>
                                        <p id="checkemail"></p>
                                        <input className="loginp" type="email" name="email"
                                               id="emailInput" placeholder="Email Address"/>
                                        <br/>
                                        <br/>
                                        <div>
                                            <input id="signupinput"
                                                   className="loginp"
                                                   type="password"
                                                   placeholder="Set Password"/>

                                            <div id="Oeye" onClick="pass('o')">
                                                <i className='fas fa-eye'></i>
                                            </div>

                                            <div id="Ceye" onClick="pass('c')">
                                                <i className='fas fa-eye-slash'></i>
                                            </div>
                                        </div>
                                        <br/>
                                        <button className="button button-block"
                                                type="submit" id="regbtn">Get
                                            Started
                                        </button>
                                    </form>
                                </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
        </>
);
}

export default Login;