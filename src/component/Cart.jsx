import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ReactLoading from "react-loading";
import {clearCart} from "../redux/cartSlice";
import $ from 'jquery'
import StripeCheckout from "react-stripe-checkout";
import {image} from "tailwindcss/lib/util/dataTypes";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [data, setData] = useState(cart.products);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const Loading = () => {
        return(
            <>
                <div className="col-md-12 loading">
                    <ReactLoading type={'spinningBubbles'} color="#57419D"
                                  height={467} width={175} className="m-auto pt-lg-5"/>
                    <br/><br/><br/>
                </div>
            </>
        )
    }

    const Clear = () => {
        dispatch(clearCart())
        setData([]);
    }

    const [stripeToken, setStripeToken] = useState(null);
    const KEY = process.env.REACT_APP_STRIPE;
    const onToken = (token) => {
        // Stripe(KEY);
        setStripeToken(token);
    }
    const user = useSelector((state) => state.user.currentUser);
    const ShowCart = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">

                    { user ? (<StripeCheckout
                        name="ZOOmart"
                        image="https://i.ibb.co/h8BLc2Q/logo.png"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        email={user.email}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey={stripeToken}
                    >
                        <button className="btn btn-outline-success me-2">CHECKOUT</button>
                    </StripeCheckout>) : (<a href="/login" className="btn btn-outline-primary me-2">
                        <i className="fa fa-sign-in me-1"> </i>Login to buy
                    </a>)}
                    <button className="btn btn-outline-danger me-2" onClick={Clear} >Clear cart</button>
                </div>
                {data.map((product)=>{
                    return (
                        <>
                            <div className="col-md-3 product">

                                <div className="card h-100 text-center p-4 border-0 subproduct" key={product.id}>
                                    <NavLink to={`/product/${product.id}`} className="text-decoration-none">
                                        <img src={product.photo} className="card-img-top" alt={product.name} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.name}</h5>
                                            <p className="card-text lead fw-bold text-dark">${product.price}</p>
                                            {/*<p className="card-text">{product.description.substring(0, 100)}</p>*/}
                                        </div>
                                    </NavLink>
                                </div>

                            </div>
                        </>
                    );
                })}
            </>
        );
    }

    return (
        <>
            {/*<img src="/assets/backgr.jpg" className="bg-image page mt-xxl-5" alt="Background" height="100%" width="100%"/>*/}
            <div className="hero pets">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 mb-5 mt-xxl-5">
                            <h1 className="display-6 fw-bolder text-center">Cart</h1>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {loading ? <Loading/> : <ShowCart/>}
                        {/*<ShowCart/>*/}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;