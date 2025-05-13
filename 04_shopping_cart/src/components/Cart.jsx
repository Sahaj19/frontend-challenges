import { useState, useEffect } from "react";
import Header from "./Header";
import productDetailsArray from "../productsData/data.json";
import Styles from "../css/Cart.module.css";
import { Link } from "react-router-dom";

function Cart() {
  const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem("product-basket")) || []);
  const [totalSum, setTotalSum] = useState(0);
  const [totalBill, setTotalBill] = useState(0);

  // Getting our desired cart
  const desiredItems = shoppingCart.map((item) => {
    const { product_id, product_count } = item;
    const requiredItem = productDetailsArray.find((item) => item.productId === product_id);
    return {
      product_id,
      product_name : requiredItem.productName,
      product_price : requiredItem.productPrice,
      product_count
    }
  })

  // Getting Our Desired Total
  useEffect(() => {
    const productCount = desiredItems.reduce((acc,curr) => {
      return acc + curr.product_count; 
    },0);
    const totalBill = desiredItems.reduce((acc,curr) => {
      return acc + (curr.product_price * curr.product_count); 
    },0);
    setTotalBill(totalBill);
    setTotalSum(productCount);
  },[shoppingCart])

  // Handling Decrease Item Count
  const decreaseItemCount = (productId) => {
    let item = shoppingCart.find((item) => item.product_id === productId);
  
    if(item && item.product_count > 0) {
      item.product_count -= 1;
      if(item.product_count === 0) {
        const updatedCart = shoppingCart.filter((item) => item.product_count !== 0);
        setShoppingCart(updatedCart);
        localStorage.setItem("product-basket", JSON.stringify(updatedCart));
      }else {
        localStorage.setItem("product-basket", JSON.stringify(shoppingCart));
        setShoppingCart([...shoppingCart]);
      }
    }else {
      return;
    }
  }

  // Handling Increase Item Count
  const increaseItemCount = (productId) => {
    let item = shoppingCart.find((item) => item.product_id === productId);
  
    if(!item) {
      item = { product_id : productId, product_count : 1 }
      shoppingCart.push(item);
    }else {
      item.product_count += 1;
    }

    localStorage.setItem("product-basket", JSON.stringify(shoppingCart));
    setShoppingCart([...shoppingCart]);
  }


  return (
    <>
      <Header totalItemsCount={totalSum}/>
      <div className="container">
        {shoppingCart.length ? <div>Total Bill :- {totalBill}</div> : ''}
        {shoppingCart.length ? <div className={Styles.cartItems}>
          {desiredItems.map((item) => {
            const { product_id, product_name, product_price, product_count } = item;
            return <div className={Styles.itemBox}>
              <p>Product Id - ${product_id}</p>
              <p>Product Name - ${product_name}</p>
              <p>Product Price - ${product_price}</p>
              <div className={Styles.quantityPurchased}>
                <button onClick={() => decreaseItemCount(product_id)} >-</button>
                <span>{product_count}</span>
                <button onClick={() => increaseItemCount(product_id)} >+</button>
              </div>
            </div>
          })}
        </div> : <div>Cart is Empty!</div>}
        <Link to={"/"}>Go Back</Link>
      </div>
    </>
  )
}

export default Cart;