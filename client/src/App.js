import 'semantic-ui-css/semantic.min.css'

import "./App.css";
import { useState, useLayoutEffect,useEffect } from "react";
import Axios from "axios";
import ProductCard from './components/ProductCard.js'
import Login from './components/Login';
import Navbar from './components/Navbar';
import AddProductForm from './components/AddProductForm';
import ProductCatalog from './components/ProductCatalog';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
// const products = function(){
//   Axios.get("http://localhost:3001/products").then((response) => {
//     setProductList(response.data);
//   });
// };

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  useLayoutEffect(()=>{
    Axios.get("http://localhost:3001/products").then((response) => {
          setProductsList(response.data);
          console.log('ceva ',response.data);
        });
    //populeaza cos
    Axios.get("http://localhost:3001/shoppingcart").then((response) => {
          setProductsInCart(response.data);
          console.log('ceva in cos',response.data);
        });
  },[]);


  const renderProductCard = (product) => {
    return <div>
      {product.product_name}
    </div>
  }

  return (
    <Router>
      <div className="App">
        <Navbar  
        productsList={productsList}  
        setProductsList={setProductsList} 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
        productsInCart={productsInCart} 
        setProductsInCart={setProductsInCart}/>
        <h2><strong>{isAdmin? 'Admin mode':'Regular User mode'}</strong></h2>

        <Switch> 
          <Route exact path='/'>
              <ProductCatalog 
              productsList={productsList} 
              isAdmin={isAdmin} 
              setProductsList={setProductsList}
              productsInCart={productsInCart}
              setProductsInCart={setProductsInCart}
              />
          </Route>
            
          <Route exact path='/products/add'>
            <AddProductForm productsList={productsList}  setProductsList={setProductsList}/>
          </Route> 
        </Switch>
      </div>
    </Router>
);
}

export default App;
