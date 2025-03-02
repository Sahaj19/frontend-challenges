const cartItems = document.querySelector("#cartItems");
const cartItemsCount = document.querySelector("#cartItemsCount");
let shoppingCart = JSON.parse(localStorage.getItem("product-basket")) || [];


// UI Initialization Function
function updateUI() {
  const storedCart = JSON.parse(localStorage.getItem("product-basket")) || [];

  cartItems.innerHTML = productDetailsArray.map((item) => {
    const { productId, productName, productPrice } = item;
    const cartItem = storedCart.find((item) => item.product_id === productId);
    const count = cartItem ? cartItem.product_count : 0;

    return `
    <div class="itemBox">
      <p>Product Id - ${productId}</p>
      <p>Product Name - ${productName}</p>
      <p>Product Price - ${productPrice}</p>
      <div class="quantityPurchased">
        <button onclick=decreaseCount('${productId}')>-</button>
        <span id="itemCount${productId}">${count}</span>
        <button onclick=increaseCount('${productId}')>+</button>
      </div>
    </div>`
  }).join("");

  // calculating the total cart items
  const totalCartItems = storedCart.reduce((acc,curr) => {
    return acc + curr.product_count
  },0);
  cartItemsCount.textContent = totalCartItems;
}

// Initializing our UI
updateUI()

// Handling Increase Count Function
function increaseCount(productId) {
  let item = shoppingCart.find((item) => item.product_id === productId);
  
  if(!item) {
    item = { product_id : productId, product_count : 1 }
    shoppingCart.push(item);
  }else {
    item.product_count += 1;
  }

  localStorage.setItem("product-basket", JSON.stringify(shoppingCart));
  updateUI();
}

// Handling Decrease Count Function
function decreaseCount(productId) {
  const item = shoppingCart.find((item) => item.product_id === productId);
  
  if(item && item.product_count > 0) {
    item.product_count -= 1;
    if(item.product_count === 0) {
      shoppingCart = shoppingCart.filter((item) => item.product_count !== 0);
    }
  }else {
    return;
  }

  localStorage.setItem("product-basket", JSON.stringify(shoppingCart));
  updateUI();
}


