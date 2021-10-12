import Axios from 'axios'
import {React, useState} from 'react'
import { Button, Header, Icon, Modal, Form, Input } from 'semantic-ui-react'
let axiosConfig = {
  headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
  }
};
function AddProductForm({setProductsList,productsList}) {
  const [open, setOpen] = useState(false);
  const [ categoryName, setCategoryName]=useState("RPG"); // default value
  const [ productName, setProductName]=useState("")
  const [ productDetails,setProductDetails]=useState("");
  const [ price, setPrice]=useState("");
  const [ productImage, setProductImage]=useState("");

  const addProduct= ()=>{
    console.log('inainte de add',productsList);

    const bodyOfReq = {
      category_name:categoryName,
      product_name:productName,
      product_details:productDetails,
      price:price, 
      product_image:productImage}
    console.log('in add product function');
    Axios.post("http://localhost:3001/products", bodyOfReq).then(()=>{setProductsList([...productsList,{ category_name:categoryName,
    product_name:productName,
    product_details:productDetails,
    price:price, 
    product_image:productImage}])});

    console.log('dupa de add',productsList);
  }
  const handleAddProduct=()=>{
    addProduct();
    setOpen(false);
  }

  return (
    <Modal
      closeIcon
      open={open}
      trigger={<Button>Adauga produs</Button>}
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
        <Input placeholder='nume joc'    onChange={(event) => {setProductName(event.target.value); console.log(event.target.value)}}/>
        </Form.Field>
        <Form.Field required>
            <label>Descriere</label>
            <Input placeholder='descriere joc' onChange={(event) => {setProductDetails(event.target.value); console.log(event.target.value)}} />
        </Form.Field>
        <Form.Field required>
            <label>Url imagine</label>
            <Input placeholder='cover joc'  onChange={(event) => {setProductImage(event.target.value); console.log(event.target.value)}}/>
        </Form.Field>
        <Form.Field required>
            <label>Pret</label>
            <Input placeholder='pret joc'  onChange={(event) => {setPrice(event.target.value); console.log(event.target.value)}}/>
        </Form.Field>
        <Form.Field required label='Genul jocului' control='select'  onChange={(event) => {setCategoryName(event.target.value); console.log(event.target.value)}}>
            <option value='RPG'>RPG</option>
            <option value='Simulation'>Simulation</option>
            <option value='Shooter'>Shooter</option>
        </Form.Field>
      </Form> 
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='remove' /> cancel
        </Button>
        <Button color='green' onClick={() => handleAddProduct()}>
          <Icon name='checkmark' /> add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddProductForm;