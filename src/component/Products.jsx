import React, {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";
import ReactLoading from "react-loading";
import {useDispatch, useSelector} from "react-redux";
import {addProduct} from "../redux/cartSlice";

const Products = () => {
    const cart = useSelector(state => state.cart);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    let componentMounted = true;
    const dispatch = useDispatch();

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:3000/goods");
            if(componentMounted){
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }
        getProducts();
    }, []);

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

    const filterProduct = (cat) => {
        const updateList = data.filter((x)=>x.category_id === cat);
        setFilter(updateList);
    }

    const isExist = (current_pr) => cart.products.some(pr => {
        return pr.id === current_pr.id;
    });

    const handleClick = (pr) => {
        if(isExist(pr)){
            alert("Already ADDED!");
        }
        else {
            dispatch(addProduct({...pr, quantity}));
        }
    }

    const ShowProducts = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-3 pb-5">
                    <button className="btn btn-outline-warning me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('1')}>Sweets</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('2')}>Accessories</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('3')}>Clothes</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('4')}>Other</button>

                </div>
                {filter.map((product)=>{
                    return (
                        <>
                            <div className="col-md-3 product">

                                <div className="card h-100 text-center p-4 border-0 subproduct" key={product.id}>
                                    <NavLink to={`/product/${product.id}`} className="text-decoration-none">
                                        <img src={product.photo} className="card-img-top" alt={product.name} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{product.name}</h5>
                                            <p className="card-text lead fw-bold text-dark">${product.price}</p>
                                            <p className="card-text">{product.description.substring(0, 100)}...</p>
                                        </div>
                                    </NavLink>

                                    <div className="text-white mt-md-auto" onClick={()=>handleClick(product)}>
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
        <div className="hero">
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