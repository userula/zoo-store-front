import Cart from "./component/Cart";
import Home from "./component/Home";
import Products from "./component/Products";
import Product from "./component/Product";
import Login from "./component/authentication/Login";
import Success from "./component/Success";
import {
    Route,
    Routes
} from "react-router-dom";
import {useSelector} from "react-redux";
import Pets from "./component/Pets";
import {useEffect} from "react";
import Profile from "./component/Profile";

const App = () => {
    const CheckToMobile = () => {
        if(window.outerWidth <= 800){
            alert('AAAA');
        }
    }
    useEffect(() => {
        CheckToMobile();

    }, []);
    const user = useSelector(state => state.user.currentUser);
    return (
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/pets" element={<Pets/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/products/:category" element={<Products/>}/>
            <Route path="/success" element={<Success/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/product/:id" element={<Product/>}/>
            <Route path="/profile" element={<Profile/>}/>
            {
                !user && <Route path="/login" element={<Login/>}/>
            }
            <Route path="*" element={<Home />}/>
        </Routes>
    );
};

export default App;