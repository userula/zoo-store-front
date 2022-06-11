import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ReactLoading from "react-loading";
import {clearCart, updateProducts} from "../redux/cartSlice";
import $ from 'jquery'
import StripeCheckout from "react-stripe-checkout";
import {image} from "tailwindcss/lib/util/dataTypes";
import {useHttp} from "../hooks/http.hook";
import {api_link} from "../index";
import alert from "bootstrap/js/src/alert";
// import {Stripe} from "stripe";

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const [data, setData] = useState(cart.products);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(cart.total);

    useEffect(() => {
        // dispatch(updateProducts(data));
        // setTotal();
        // setData(cart.products);
        setTotal(cart.total);
    }, []);

    const Loading = () => {
        return (
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
        setTotal(0.00);
    }

    const [stripeToken, setStripeToken] = useState(null);
    const KEY = "pk_test_51L9DvPFZfXNbcLsxSV9nIBOXquhORbVWhrw8Pxbb4DWpNd7nyvgT4qoT67WbN9BGwUREOnfqXvV6SczAl8INFCo900uhbS2nPf";
    const onToken = (token, address) => {
        // Stripe(KEY);
        // setStripeToken(token);
        if(token.object === "token"){
            createOrder().then(r => {});

        }
        console.log(token);
    }

    const descQuant = (i) => {
        let new_cart = [...data];
        let q = new_cart[i].quantity;
        if (q === 1) {
            new_cart = [...new_cart.slice(0, i), ...new_cart.slice(i + 1, new_cart.length)];
        } else {
            new_cart[i].quantity = q - 1;
            setTotal(total - new_cart[i].price);
        }
        // dispatch(updateProducts(new_cart));
        setData(new_cart);
    }
    const addQuant = (i) => {
        const new_cart = [...data];
        let q = new_cart[i].quantity;
        new_cart[i].quantity = q + 1;
        setTotal(total + new_cart[i].price);
        setData(new_cart);
        // dispatch(updateProducts(i));
    };

    const {send_order} = useHttp();

    const createOrder = async () => {
        let list = data.map((p) => {
            return {
                "id": p.productId,
                "quantity": p.quantity
            }
        });
        console.log(list);
        let order = {
            "dateOfPayment": new Date().toISOString(),
            "dateOfCompletion": null,
            "isPickup": true,
            "status": 1,
            "isCard": true,
            "orders": list
        }
        try {
            await send_order(`${api_link}/order/create`, 'POST', {...order}, {"Authorization": "Bearer " + user.token})
        } catch (e) {
            alert(e);
        }
    };

    const buy = () => {
        if(data === []){

        }
        else{
            dispatch(clearCart());
            setData([]);
        }
    };


    const user = useSelector((state) => state.user.currentUser);
    const ShowCart = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center pb-5">

                    {user ? (<StripeCheckout
                        name="ZOOmart"
                        image="https://i.ibb.co/h8BLc2Q/logo.png"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${total}`}
                        email={user.email}
                        amount={total * 100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <button className="btn btn-outline-success me-2" onClick={buy}>CHECKOUT</button>
                    </StripeCheckout>) : (<a href="/login" className="btn btn-outline-primary me-2">
                        <i className="fa fa-sign-in me-1"> </i>Login to buy
                    </a>)}
                    <button className="btn btn-outline-danger me-2" onClick={Clear}>Clear cart</button>
                </div>
                <div className="text-center mb-lg-5">
                    <h4>Total: <strong>${total.toFixed(2)}</strong></h4>
                </div>
                {data.map((product, i) => {
                    return (
                        <>
                            <div className="col-md-3 product">
                                {/*<h4>{i}</h4>*/}
                                <div className="card h-100 text-center p-4 border-0 subproduct" key={product.id}>
                                    {/*<NavLink to={`/product/${product.id}`} className="text-decoration-none">*/}
                                    <img src={product.image} className="card-img-top" alt={product.name}
                                         height="250px"/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{product.name}</h5>
                                        <p className="card-text lead fw-bold text-dark">${product.price}</p>
                                        <div className="row w-50 m-auto align-items-baseline mt-4">
                                            <a className="text-decoration-none col-sm-2 mx-sm-1"><i
                                                className="fa fa-minus"
                                                onClick={() => descQuant(i)}></i></a>
                                            <h6 className="col-sm-5">{product.quantity}</h6>
                                            <a className="text-decoration-none col-sm-2">
                                                <i className="fa fa-plus"
                                                   onClick={() => addQuant(i)}></i>
                                            </a>
                                        </div>
                                    </div>
                                    {/*</NavLink>*/}
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