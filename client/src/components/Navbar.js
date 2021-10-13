import { useState } from "react";
import { Card, Button, Image, Icon, Header } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import AddProductForm from "./AddProductForm";

const Navbar = ({productsList,setProductsList, isAdmin, setIsAdmin}) => {

  return (
    <div className="navigation-bar">
      <span className='navigation-bar-item'>
      <Header as='h2' image='https://icon-library.com/images/gaming-icon/gaming-icon-2.jpg' content='Games Shop' />
      </span>
      <span className='navigation-bar-item'>
      <Button.Group>
            <Button onClick={()=>setIsAdmin(true)}>Admin</Button>
            <Button.Or />
            <Button onClick={()=>setIsAdmin(false)}positive>User</Button>
         </Button.Group>
      </span>
      <span className='navigation-bar-item'>
         {isAdmin && <AddProductForm productsList={productsList}  setProductsList={setProductsList}/>}
      </span>
      <span className='navigation-bar-item'>
         {!isAdmin && <Icon name='shopping cart' size="large"/>}
      </span>
    </div>

 );
}

export default Navbar;
