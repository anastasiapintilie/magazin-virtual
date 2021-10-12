import { useState } from "react";
import { Card, Button, Image, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import AddProductForm from "./AddProductForm";

const Navbar = ({productsList,setProductsList, isAdmin, setIsAdmin}) => {

  return (
    <div className="navigation-bar">
        <Link to="/">Products</Link>
        <Button.Group>
            <Button onClick={()=>setIsAdmin(true)}>Admin</Button>
            <Button.Or />
            <Button onClick={()=>setIsAdmin(false)}positive>User</Button>
         </Button.Group>
        {isAdmin && <AddProductForm productsList={productsList}  setProductsList={setProductsList}/>}
        
    </div>

 );
}

export default Navbar;
