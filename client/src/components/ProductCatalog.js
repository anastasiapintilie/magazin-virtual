import ProductCard from "./ProductCard"

const ProductCatalog=({productsList,setProductsList,isAdmin,productsInCart,setProductsInCart})=>{
    return   <div className="product-catalog">
    {productsList.map(product =><ProductCard 
    product={product}  
    productsList={productsList}  
    setProductsList={setProductsList}  
    isAdmin={isAdmin}
    productsInCart={productsInCart}
    setProductsInCart={setProductsInCart} />) }
    </div>
}

export default ProductCatalog;