import { useState, useEffect } from "react";
import { Card, Button, Image, Icon, Header,Modal, List } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import AddProductForm from "./AddProductForm";

const Navbar = ({productsList,setProductsList, isAdmin, setIsAdmin, productsInCart, setProductsInCart}) => {
  
  const calculateTotalOfCart = () =>{
    let total = 0;
    productsInCart.map(product => total+=(product.price*product.quantity));
    return total;
  }

 

  const cartCheckout = ( <Modal
  trigger={<Icon name='shopping cart' size="large"/>}
  header='Finalizeaza cumparaturi'
  content={ <span>
    {productsInCart.map(produs=> {
    console.log('produs.product_id',produs)
    return( 
    <span>
        <List divided relaxed>
      <List.Item  key={produs.product_id}>
        <Image avatar src={produs.product_image} />
        <List.Content key={produs.product_id}>
          <List.Header as='a'>{produs.product_name}</List.Header>
          <List.Description as='a'><strong>{produs.price} RON</strong></List.Description>
          <List.Description  key={produs.product_id} as='a'><strong>cantitate: {produs.quantity} </strong></List.Description>
        </List.Content>
      </List.Item>
    </List>
    </span>
      )
  })}
  <span style={{float:'right'}}>Total:{calculateTotalOfCart()}</span>
  </span>}
  actions={[{ key: 'done', content: 'Trimite', positive: true }]}
/>)

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
         {!isAdmin && cartCheckout}
      </span>
    </div>

 );
}

export default Navbar;
