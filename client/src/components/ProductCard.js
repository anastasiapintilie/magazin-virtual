import { useState } from "react";
import Axios from 'axios';
import { Card, Button, Image, Icon, Header, Modal, Form, Input, Comment } from 'semantic-ui-react'
import { } from 'semantic-ui-react'
import './ProductCard.css';


const ProductCard = (props) => {
const {
    product_id,
    product_name, 
    product_details, 
    price, 
    category_name,
    product_image} = props.product;
  const {
    productsInCart,
    setProductsInCart
  } = props;
    const [openDetails, setOpenDetails] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

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
    setOpenEdit(false);
  };

const editButton = ( <Modal
  closeIcon
  open={openEdit}
  trigger={    
    <Button size='mini' inverted color='blue'>      
    <Icon name='pencil alternate' />
  </Button>}
  onClose={() => setOpenEdit(false)}
  onOpen={() => setOpenEdit(true)}
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
    <Button color='red' onClick={() => setOpenEdit(false)}>
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

const detailsButton = (<Modal
  onClose={() => setOpenDetails(false)}
  onOpen={() => setOpenDetails(true)}
  open={openDetails}
  trigger={
  <Button size='mini' primary>      
  D
</Button>
}
>
  <Modal.Header>{productName}</Modal.Header>
  <Modal.Content image>
    <Image size='medium' src={productImage} wrapped />
    <Modal.Description>
      <Header size="tiny" color="grey"><strong>Categorie: </strong>{categoryName}</Header>
      <Header size="small" color="red"><strong>Pret: </strong> {productPrice} RON</Header>
      <div><strong>Details:</strong></div>
      <p>
        {productDetails}
      </p>
      <Button size='mini' inverted color='green'>      
       <Icon name='cart arrow down' />
       Adauga in cos
      </Button>
    </Modal.Description>
    <div className='review-section'>
    <Comment.Group>
    <Header as='h3' dividing>
      Reviews
    </Header>

    <Comment>
      <Comment.Avatar src='/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Matt</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
    </div>  
  </Modal.Content>
  <Modal.Actions>
    <Button color='black' onClick={() => setOpenDetails(false)}>
      Cancel
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

  const addToCart= (id)=>{
    const bodyOfReq = {
      category_name:categoryName,
      product_name:productName,
      product_details:productDetails,
      price:price, 
      product_image:productImage}
    Axios.post("http://localhost:3001/shoppingcart", {product_id:id}).then(()=>{setProductsInCart([...productsInCart,{ category_name:categoryName,
    product_name:productName,
    product_details:productDetails,
    price:price, 
    product_image:productImage,
    quantity:1}])});
  }

const extra =(product_id)=> (
<span className='card-buttons'>
{ !isAdmin && <span id="userButtons">
  <Button size='mini' inverted color='green' onClick={()=>{addToCart(product_id)}}>      
        <Icon name='cart arrow down' />
    </Button>
    {detailsButton}
  </span>}
{ isAdmin &&  <span id="adminButtons">
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
