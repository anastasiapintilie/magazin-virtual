import { useState } from "react";
import Axios from 'axios';
import { Card, Button, Image, Icon } from 'semantic-ui-react'
import './ProductCard.css';


const ProductCard = (props) => {
const {
    product_id,
    product_name, 
    product_details, 
    price, 
    category_name,
    product_image,} = props.product;

const {productsList,setProductsList}=props;
const deleteProduct = (id) => {
    Axios.delete(`http://localhost:3001/products/${id}`).then((response) => {
      setProductsList(
        productsList.filter((val) => {
          return val.product_id != id;
        })
      );
      console.log('deleteing program '+id);
    });
  };
const extra =(product_id)=> (
<span className='card-buttons'>
    <Button size='mini' inverted color='green'>      
        <Icon name='cart arrow down' />
      Adauga in cos
    </Button>
    <Button size='mini' primary>      
        Detalii
    </Button>
    <Button size='mini' inverted color='red' onClick={()=> deleteProduct(product_id)}>      
       <Icon name='trash alternate' />
    </Button>
    <Button size='mini' inverted color='blue'>      
       <Icon name='pencil alternate' />
    </Button>
</span>
  )


  return (
    <Card
        image={product_image}
        header={product_name}
        meta={category_name}
        description={`pret ${price} RON`}
        extra={extra(product_id)}
        className='product-card'
    />
 );
}

export default ProductCard;
