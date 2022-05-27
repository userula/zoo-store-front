import React, {useState, useEffect} from "react";
import ReactLoading from 'react-loading';
import {NavLink} from "react-router-dom";


const Pets = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getPets = async () => {
            setLoading(true);
            const response = await fetch("http://localhost:3000/pets");
            if(componentMounted){
                setData(await response.clone().json());
                setFilter(await response.json());
                setLoading(false);
            }

            return () => {
                componentMounted = false;
            }
        }
        getPets();
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

    const filterProduct = (grp) => {
        const updateList = data.filter((x)=>x.group === grp);
        setFilter(updateList);
    }

    const ShowPets = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-warning me-2" onClick={()=>setFilter(data)}>All</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('Cat')}>Cats</button>
                    <button className="btn btn-outline-dark me-2" onClick={()=>filterProduct('Dog')}>Dogs</button>

                </div>
                {filter.map((pet)=>{
                    return (
                        <>
                            <div className="col-md-3 product">

                                <div className="card h-100 text-center p-4 border-0 subproduct" key={pet.id}>
                                    <NavLink to={`/pets/${pet.id}`} className="text-decoration-none">
                                        <img src={pet.photos} className="card-img-top" alt={pet.name} height="250px"/>
                                        <div className="card-body">
                                            <h5 className="card-title mb-0">{pet.name}</h5>
                                            <p className="card-text">{pet.gender}</p>
                                            <p className="card-text">{pet.description.substring(0, 100)}...</p>


                                            <p className="card-text text-lg-end text-dark number mb-3 fw-bolder" id={`number${pet.id}`}>{pet.owner_number}</p>
                                        </div>
                                    </NavLink>
                                    <div className="shownumb mt-md-auto">
                                        <a href="" className="text-white text-decoration-none" id={pet.id}>
                                            <button className="addtocart">
                                                Adopt
                                            </button>
                                        </a>
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
            <div className="h-50">
                <h1>Hello</h1>
            </div>
            <img src="/assets/pets5.png" className="bg-image page mt-xxl-5" alt="Background" height="100%" width="100%"/>
            <div className="hero">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 mb-5 mt-xxl-5">
                            <h1 className="display-6 fw-bolder text-center">Pets</h1>
                            <hr/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {loading ? <Loading/> : <ShowPets/>}
                    </div>
                </div>
            </div>
        </>

    );
}

export default Pets;