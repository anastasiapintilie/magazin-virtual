import { useState } from "react";
import { Card, Button, Image, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import AddProductForm from "./AddProductForm";

const Navbar = ({productsList,setProductsList}) => {

  return (
    <div className="navigation-bar">
        <Link to="/">Products</Link>
        <AddProductForm productsList={productsList}  setProductsList={setProductsList}/>
        
    </div>

 );
}

export default Navbar;
