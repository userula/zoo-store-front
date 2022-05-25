import React, {useState, useEffect} from "react";
import Skeleton from "react-loading-skeleton";

const Pets = () => {

    const [data, setData] = useState([]);
    const [filter, setFilter] = useState(data);
    const [loading, setLoading] = useState(false);
    let componentMounted = true;

    useEffect(() => {
        const getPets = async () => {
            setLoading(true);
            const response = await fetch("https://628e40fca339dfef87aab9d6.mockapi.io/api/v1/pets/1");
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
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
                <div className="col-md-3">
                    <Skeleton height={350}/>
                </div>
            </>
        )
    }

    const ShowPets = () => {
        return (
            <>
                <div className="buttons d-flex justify-content-center mb-5 pb-5">
                    <button className="btn btn-outline-warning me-2">All</button>
                    <button className="btn btn-outline-dark me-2">Sweets</button>
                    <button className="btn btn-outline-dark me-2">Accessories</button>
                    <button className="btn btn-outline-dark me-2">Clothes</button>
                    <button className="btn btn-outline-dark me-2">Other</button>

                </div>
                {filter.map((pet)=>{
                    return (
                        <>
                            <div className="col-md-3 product">
                                <div className="card h-100 text-center p-4 border-0 subproduct" key={pet.id}>
                                    <img src={pet.photos} className="card-img-top" alt={pet.name} height="250px"/>
                                    <div className="card-body">
                                        <h5 className="card-title mb-0">{pet.name}</h5>
                                        <p className="card-text">{pet.gender}</p>
                                        <p className="card-text">{pet.description.substring(0, 100)}...</p>
                                        <a href="#" className="text-white text-decoration-none shownumb">
                                            <button className="addtocart">
                                                Adopt
                                            </button>
                                        </a>
                                        <p className="card-text text-lg-end text-dark number">{pet.owner_number}</p>
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
        <div>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 mb-5">
                        <h1 className="display-6 fw-bolder text-center">Pets</h1>
                        <hr/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {loading ? <Loading/> : <ShowPets/>}
                </div>
            </div>
        </div>
    );
}

export default Pets;