import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import ReactLoading from "react-loading";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/cartSlice";
import {api_link} from "../index";
import "react-toastify/dist/ReactToastify.css";
import {toast} from "react-toastify";


// toast.configure()

const Products = () => {
    const cart = useSelector(state => state.cart);
    const [products, setProduct] = useState([]);
    const [filter, setFilter] = useState(products);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    let componentMounted = true;
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch(`${api_link}/product`);
            const response2 = await fetch(`${api_link}/clothes`);
            if (componentMounted) {
                let pr = await response.clone().json();
                let cl = await response2.clone().json();
                setProduct([...pr, ...cl]);
                setFilter([...pr, ...cl]);
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }
        // getDoctorAvatar('13');

        getProducts();
    }, []);

    // const getDoctorAvatar = async (id) => {
    //     try {
    //         return await fetch(`${api_link}/image/${id}`).then((res) => {
    //             res.blob().then((myBlob) => {
    //                 return URL.createObjectURL(myBlob);
    //             });
    //         });
    //     } catch (e) {
    //         console.log(e.message);
    //     }
    // };

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

    const filterProduct = (cat) => {
        const updateList = products.filter((x) => x.categoryId === cat);
        setFilter(updateList);
    }

    const isExist = (current_pr) => cart.products.some(pr => {
        return pr.id === current_pr.id;
    });

    const [img, setImg] = useState('');

    const handleClick = (pr) => {
        if (isExist(pr)) {
            toast("Already ADDED to cart!", {type: "warning"});
            // alert("Already ADDED to cart!");
        } else {
            // alert('Added!');
            toast("Added!", {type: 'success'});
            dispatch(addProduct({...pr, quantity}));
        }
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons mb-3 pb-5 text-center">
                    <button className="btn btn-outline-warning m-2 col-md-1"
                            onClick={() => setFilter(products)}>All
                    </button>
                    <button className="btn btn-outline-dark m-2 col-md-1" onClick={() => filterProduct(1)}>Sweets
                    </button>
                    <button className="btn btn-outline-dark m-2 col-md-1"
                            onClick={() => filterProduct(4)}>Accessories
                    </button>
                    <button className="btn btn-outline-dark m-2 col-md-1"
                            onClick={() => filterProduct(7)}>Treats
                    </button>
                    <button className="btn btn-outline-dark m-2 col-md-1" onClick={() => filterProduct(3)}>Clothes
                    </button>
                    <button className="btn btn-outline-dark m-2 col-md-1"
                            onClick={() => filterProduct(9)}>Other
                    </button>

                </div>
                {filter.map((product) => {
                    return (
                        <>
                            <div className="col-md-3 product">
                                <div className="card h-100 text-center p-4 border-0 subproduct" key={product.id}>
                                    <NavLink to={`/product/${product.productId}`} className="text-decoration-none">
                                        <img src={product.image} className="card-img-top"
                                             alt={product.name} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.categoryId}. {product.name}</h5>
                                            <p className="card-text lead fw-bold text-dark">${product.price}</p>
                                            <p className="card-text">{product.description.substring(0, 100)}...</p>
                                        </div>
                                    </NavLink>

                                    <div className="text-white mt-md-auto" onClick={() => handleClick(product)}>
                                        <button className="addtocart">
                                            Add to cart
                                        </button>
                                    </div>
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
            <div className="">
            </div>

            {/*<img src="/assets/backgr.jpg" className="bg-image page mt-xxl-5" alt="Background" height="100%" width="100%"/>*/}
            <div className="hero pets">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 mb-5">
                            <h1 className="display-6 fw-bolder text-center">Products</h1>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {loading ? <Loading/> : <ShowProducts/>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;