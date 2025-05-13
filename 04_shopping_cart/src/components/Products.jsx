import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Styles from "../css/Products.module.css";
import PropTypes from "prop-types";


function Products({ productDetailsArray, updateTotalItemsCount }) {
  const [shoppingCart, setShoppingCart] = useState(JSON.parse(localStorage.getItem("product-basket")) || []);

  useEffect(() => {
    const newCount = shoppingCart.reduce((acc,curr) => {
      return acc + curr.product_count
    },0);
    updateTotalItemsCount(newCount);
  }, [shoppingCart]);

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
    <div className="container">
      <div className={Styles.cartItems}>
        {productDetailsArray.map(({ productId, productName, productPrice }) => {
          const cartItem = shoppingCart.find((item) => item.product_id === productId);
          const itemCount = cartItem ? cartItem.product_count : 0;
          return (
            <div key={productId} className={Styles.itemBox}>
              <p>Product Id - ${productId}</p>
              <p>Product Name - ${productName}</p>
              <p>Product Price - ${productPrice}</p>
              <div className={Styles.quantityPurchased}>
                <button onClick={() => decreaseItemCount(productId)} className={Styles.button}>-</button>
                <span>{itemCount}</span>
                <button onClick={() => increaseItemCount(productId)} className={Styles.button}>+</button>
              </div>
            </div>
          );
        })}
      </div>
      <Link to={"/cart"}>Go To Cart</Link>
    </div>
  );
}

Products.propTypes = {
  productDetailsArray: PropTypes.array,
  updateTotalItemsCount: PropTypes.func
};

export default Products;
