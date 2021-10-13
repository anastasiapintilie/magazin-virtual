const express= require("express");
const app = express();
const mysql= require('mysql');
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",
    port:3306,
    database:"magazin",
})
app.get('/',(req,res)=>{
  res.send("heloooo")
})
app.get('/products',(req,res)=>{
    db.query("SELECT * FROM products", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
})

app.post('/products',(req,res)=>{
    const{category_name,product_name,product_details,price, product_image}=req.body;
    console.log("in post /products")
    db.query('insert into products(category_name,product_name,product_details,price, product_image) values (?,?,?,?,?);',
    [category_name,product_name,product_details,price, product_image], 
    (err,result)=>{
        if(err){
            console.log('eroare la adaugare joc',err);
            res.status(500).json(err)
        }
        else{
            console.log('joc adaugat');
            res.status(200).json(err)

        }
    });
});

app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM products WHERE product_id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.put("/products/:id", (req, res) => {
    const id = req.body.id;
    const{category_name,product_name,product_details,price, product_image}=req.body;

    db.query(
      "update products set category_name=?, product_name=?, product_details=?, price=?, product_image=? where product_id=?;",
      [category_name,product_name,product_details,price, product_image, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });
  app.get('/shoppingcart',(req,res)=>{
    db.query("select cart.quantity, products.product_id, products.product_image,products.product_name,products.price from cart inner join products on cart.product_id=products.product_id;", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
})

  app.post('/shoppingcart',(req,res)=>{
    const{product_id}=req.body;
    console.log("in post /shoppingcart")
    console.log(req.body.product_id);
    db.query('insert into cart(product_id) values (?);',
    [product_id], 
    (err,result)=>{
        if(err){
            console.log('eroare la adaugare produs in cos',err);
            res.status(500).json(err)
        }
        else{
            console.log('produs adaugat in cos');
            res.status(200).json(err)

        }
    });
});

app.listen(3001, ()=>{
    console.log("server running on port 3001....");
});