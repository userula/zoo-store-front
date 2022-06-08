import React, {useState} from "react";
import '../../css/login.css';
import $ from 'jquery';
import {api_link, client_id} from "../../index";
import GoogleLogin from 'react-google-login';

let readerView = false;


const openG1 = () => {
    if (readerView === true) {
        // $('#group1').css('background-color', 'aliceblue');
        // $('#group2').css('background-color', 'grey');
        $('.signup').slideToggle();
        $('.login').slideToggle();
        readerView = false;
    }
};

const openG2 = () => {
    if (readerView === false) {
        // $('#group2').css('background-color', 'aliceblue');
        // $('#group1').css('background-color', 'grey');
        $('.signup').slideToggle();
        $('.login').slideToggle();
        // $('.regPassword').addClass('position-absolute');
        readerView = true;
    }
};

const pass = (data) => {
    if (data === 'o') {
        $('#Oeye').css('display', 'none');
        $('#Ceye').css('display', 'block');
        $('#signupinput').attr('type', 'text');
    } else {
        $('#Oeye').css('display', 'block');
        $('#Ceye').css('display', 'none');
        $('#signupinput').attr('type', 'password');
    }
};

// const [loginData, setLoginData] = useState(
//     localStorage.getItem('loginData') ? JSON.parse(localStorage.getItem('loginData')) : null
// );

const handleLogin = (response) => {
    console.log(response.tokenId);
    alert(response.tokenId);
};
const handleFailure = (response) => {
    console.log(response);
    alert(response.error);
};



const Login = () => {

    return (
        <>
            <div className="full">
                {/*<Authorization/>*/}
                <div className="m-auto mt-5 mainpage w-50">
                    <div className="row justify-content-center">

                        <div className="showPage col-sm-6">
                            <br/><br/>
                            <div className="choose flex-row w-50 justify-content-sm-center">
                                <button id="group1" className="text-center m-2" onClick={openG1}>Log In</button>
                                <button id="group2" className="text-center m-2" onClick={openG2}>Sign Up</button>
                            </div>
                            {/*<hr/>*/}
                            <div className="login" id="login">
                                <br/>
                                <div id="h1">
                                    <h1>Welcome back</h1>
                                    <p id="logerr"></p>
                                    <hr/>
                                    <br/>
                                    <form action={`${api_link}/auth`} method="post">
                                        <input className="loginp" type="email" id="logEmail" placeholder="Email Address"
                                               required autoComplete="on" name="email"/>
                                        <br/>
                                        {/*<br/>*/}
                                        <input className="loginp" type="password" id="logPass"
                                               placeholder="Password" name="password"/>
                                        <div className="row mt-3">
                                            <div className="col-sm-3">
                                                <label className="switch">
                                                    <input type="checkbox"/>
                                                    <span className="slider"></span>
                                                </label>
                                            </div>
                                            <p className="col-sm-6"><strong>Remember me</strong></p>
                                        </div>
                                        <button className="button button-block" type='submit' id="logbtn">Log In
                                        </button>
                                    </form>
                                    <br/>
                                    {/*<a href="https://api-zoo-app.herokuapp.com" target="_blank">*/}
                                    {/*    <button className="btn google btn-outline-danger text-uppercase fw-bold"*/}
                                    {/*            type="submit">*/}
                                    {/*        <i className="fa fa-google me-2" aria-hidden="true"></i> Sign in with Google*/}
                                    {/*    </button>*/}
                                    {/*</a>*/}

                                    <GoogleLogin
                                        clientId={client_id}
                                        buttonText="SIGN IN WITH GOOGLE"
                                        onSuccess={handleLogin}
                                        onFailure={handleFailure}
                                        cookiePolicy={'single_host_origin'}
                                        redirectUri="/"
                                    ></GoogleLogin>
                                </div>
                            </div>


                            <div className="signup" id="signup">
                                <br/>
                                <div id="h1">
                                    <h1>Sign Up for Free</h1>
                                    <p id="errormsg"></p>
                                    <hr/>
                                    <form>
                                        <br/>
                                        <input className="loginp" type="name" id="lnameInput"
                                               placeholder="Name"/>
                                        {/*<br/>*/}
                                        <p id="checkemail"></p>
                                        <input className="loginp" type="email" name="email"
                                               id="emailInput" placeholder="Email Address"/>
                                        <br/>
                                        <div className="regPassword">
                                            <input id="signupinput"
                                                   className="loginp col-md-10"
                                                   type="password"
                                                   placeholder="Password"/>
                                            <div>
                                                <div id="Oeye" onClick={() => pass("o")}>
                                                    <i className='fa fa-eye fa-lg'></i>
                                                </div>

                                                <div id="Ceye" onClick={() => pass("c")}>
                                                    <i className='fa fa-eye-slash fa-lg'></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <input id="signupinput"
                                                   className="loginp mt-3"
                                                   type="password"
                                                   placeholder="Confirm Password"/>
                                        </div>
                                        <br/>
                                        <button className="button button-block"
                                                type="submit" id="regbtn">Get
                                            Started
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <br/><br/>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;