import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import ReactLoading from "react-loading";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {addProduct} from "../redux/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {api_link} from "../index";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";


const Product = () => {

    const {id} = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    // const dispatch = useDispatch();
    // const addProduct = (product) => {
    //     dispatch(addCart(product));
    // }

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const response = await fetch(`https://api-zoo-app.herokuapp.com/api/v1/product/${id}`);
            let pr = await response.json();
            if (!pr.id) {
                // alert(!pr.id);
                const response2 = await fetch(`https://api-zoo-app.herokuapp.com/api/v1/clothes/${id}`);
                let cl = await response2.json();
                setProduct(cl);
            } else {
                setProduct(pr);
            }
            setLoading(false);
        }
        // const getProduct = async () => {
        //     setLoading(true);
        //     const response = await fetch(`http://localhost:3000/goods/${id}`);
        //     let pr = await response.json();
        //     setProduct(pr);
        //     setLoading(false);
        // }
        getProduct();
    }, [id]);

    const Loading = () => {
        return (
            <>
                <div className="col-md-12 loading">
                    <ReactLoading type={'spinningBubbles'} color="#57419D"
                                  height={467} width={175} className="m-auto pt-lg-5"/>
                </div>
            </>
        )
    }

    const cart = useSelector(state => state.cart);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const isExist = (current_pr) => cart.products.some(pr => {
        return pr.id === current_pr.id;
    });
    const handleClick = (pr) => {
        if (isExist(pr)) {
            alert("Already ADDED to cart!");
        } else {
            alert('Added!');
            dispatch(addProduct({...pr, quantity}));
        }
    }

    const ShowProduct = () => {
        return (
            <>
                <div className="col-md-6 mt-xxl-5">
                    <img src={product.image} alt={product.name} className="w-75"/>
                </div>
                <div className="col-md-6 mt-xxl-5 h-50">
                    <h4 className="text-uppercase text-black-50">{product.category_id}</h4>
                    <h1 className="lead display-5">{product.name}</h1>
                    <p className="lead">{product.description}</p>
                </div>
                <div className="justify-content-end text-lg-center mx-lg-5">
                    <button className="btn btn-outline-primary" onClick={() => handleClick(product)}>Add to cart
                    </button>
                </div>
            </>
        )
    }

    const ShowComments = () => {
        const [comm, setComm] = useState([]);

        const getComments = async () => {
            const comment = await fetch(`${api_link}/comment/${[product.id || product.productId]}`)
            setComm(await comment.json());
        };

        useEffect(() => {
            getComments().then(r => {})
        });
        return (
            <>
                <div className="mt-lg-5 m-auto w-75">
                    <h3>Comments</h3>

                    {
                        comm.map((c)=>{
                            return (
                                <>
                                    <Card style={{ width: '18rem' }} className="m-5">
                                        <Card.Body>
                                            <Card.Title>Anonymous</Card.Title>
                                            <Card.Text>
                                                {c.text}
                                            </Card.Text>
                                        </Card.Body>
                                        <ListGroup className="list-group-flush">
                                            <ListGroupItem>{c.star} points</ListGroupItem>
                                        </ListGroup>
                                    </Card>
                                </>
                            );
                        })
                    }
                </div>
            </>
        );
    }

    return (
        <div>
            <div className="container mt-xxl-5 min-vh-100 showPage">
                <div className="row">
                    {loading ? <Loading/> : <ShowProduct/>}
                    {loading ? <Loading/> : <ShowComments/>}
                </div>

            </div>
            <br/><br/>
        </div>
    );
}

export default Product;