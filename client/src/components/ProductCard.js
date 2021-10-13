import { useState } from "react";
import Axios from 'axios';
import { Card, Button, Image, Icon, Header, Modal, Form, Input } from 'semantic-ui-react'
import { } from 'semantic-ui-react'
import './ProductCard.css';


const ProductCard = (props) => {
const {
    product_id,
    product_name, 
    product_details, 
    price, 
    category_name,
    product_image,} = props.product;
    const [open, setOpen] = useState(false);
    const [ categoryName, setCategoryName]=useState(category_name); // default value
    const [ productName, setProductName]=useState(product_name)
    const [ productDetails,setProductDetails]=useState(product_details);
    const [ productPrice, setPrice]=useState(price);
    const [ productImage, setProductImage]=useState(product_image);
    console.log('detalii produs',productDetails);
const {productsList,
  setProductsList,
  isAdmin}=props;

  const handleEdit = (id,editedProduct) => {
    Axios.put(`http://localhost:3001/products/${id}`, editedProduct).then(
      (response) => {
        setProductsList(
          productsList.map((val) => {
            return val.product_id == id
              ? editedProduct: val;
          })
        );
      }
    );
    setOpen(false);
  };

const editButton = ( <Modal
  closeIcon
  open={open}
  trigger={    
    <Button size='mini' inverted color='blue'>      
    <Icon name='pencil alternate' />
  </Button>}
  onClose={() => setOpen(false)}
  onOpen={() => setOpen(true)}
>
  <Header icon='archive' content='Adauga un nou produs' />
  <Modal.Content>
        <p>
        Completeaza campurile
        </p>
        <Form>
    <Form.Field required>
    <label>Nume joc</label>
    <Input placeholder='nume joc' value={productName}    onChange={(event) => {setProductName(event.target.value); console.log(event.target.value)}}/>
    </Form.Field>
    <Form.Field required>
        <label>Descriere</label>
        <Input placeholder='descriere joc' value={productDetails} onChange={(event) => {setProductDetails(event.target.value); console.log(event.target.value)}} />
    </Form.Field>
    <Form.Field required>
        <label>Url imagine</label>
        <Input placeholder='cover joc' value={productImage}  onChange={(event) => {setProductImage(event.target.value); console.log(event.target.value)}}/>
    </Form.Field>
    <Form.Field required>
        <label>Pret</label>
        <Input placeholder='pret joc'value={productPrice}  onChange={(event) => {setPrice(event.target.value); console.log(event.target.value)}}/>
    </Form.Field>
    <Form.Field required label='Genul jocului' value={categoryName} control='select'  onChange={(event) => {setCategoryName(event.target.value); console.log(event.target.value)}}>
        <option value='RPG'>RPG</option>
        <option value='Simulation'>Simulation</option>
        <option value='Shooter'>Shooter</option>
        <option value='Horror'>Horror</option>
        <option value='Survival'>Survival</option>

    </Form.Field>
  </Form> 
  </Modal.Content>
  <Modal.Actions>
    <Button color='red' onClick={() => setOpen(false)}>
      <Icon name='remove' /> cancel
    </Button>
    <Button color='green' onClick={() => handleEdit(product_id,{category_name:categoryName,
    product_name:productName,
    product_details:productDetails,
    price:productPrice, 
    product_image:productImage, 
    id:product_id})}>
      <Icon name='checkmark' /> edit
    </Button>
  </Modal.Actions>
</Modal>);


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
    </Button>
    <Button size='mini' primary>      
        D
    </Button>
{ isAdmin &&  <span>
   <Button size='mini' inverted color='red' onClick={()=> deleteProduct(product_id)}>      
       <Icon name='trash alternate' />
    </Button>
    {editButton}
   </span>}
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
