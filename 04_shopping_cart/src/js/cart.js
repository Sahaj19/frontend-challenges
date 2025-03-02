const cartItems = document.querySelector("#cartItems");
const cartItemsCount = document.querySelector("#cartItemsCount");
const priceDiv = document.querySelector("#priceDiv");
const priceAmount = document.querySelector("#priceAmount");
let shoppingCart = JSON.parse(localStorage.getItem("product-basket")) || [];

// Initializing our UI
  function updateUI() {
  const storedCart = JSON.parse(localStorage.getItem("product-basket")) || [];
  // Getting our desired array
  const desiredItems = storedCart.map((item) => {
    const { product_id, product_count } = item;
    const requiredItem = productDetailsArray.find((item) => item.productId === product_id);
    return {
      product_id,
      product_name : requiredItem.productName,
      product_price : requiredItem.productPrice,
      product_count
    }
  })

  // Total Price Rendering
  if(desiredItems.length) {
    priceDiv.style.display = 'block';
    const totalSum = desiredItems.map((item) => {
      const { product_price, product_count } = item;
      return product_price*product_count;
    }).reduce((acc,curr) => acc + curr);
    priceAmount.textContent = totalSum;
  }else {
    priceDiv.style.display = 'none';
  }

  // UI Rendering
  cartItems.innerHTML = desiredItems.length !==0 
  ? desiredItems.map((item) => {
    const { product_id, product_name, product_price, product_count } = item;
    return `
    <div class="itemBox">
      <p>Product Id - ${product_id}</p>
      <p>Product Name - ${product_name}</p>
      <p>Product Price - ${product_price}</p>
      <div class="quantityPurchased">
        <button onclick=decreaseCount('${product_id}')>-</button>
        <span id="itemCount">${product_count}</span>
        <button onclick=increaseCount('${product_id}')>+</button>
      </div>
    </div>
    `
  }).join("") : `<p>Empty Cart, <a href="index.html">Back</a></p>`;

  // Product Count Rendering
  const totalCount = desiredItems.reduce((acc,curr) => {
    return acc + curr.product_count
  },0);

  cartItemsCount.textContent = totalCount;
}

updateUI();

// Increase Count Function
function increaseCount(productId) {
  const requiredItem = shoppingCart.find((item) => item.product_id === productId);
  requiredItem.product_count += 1;
  localStorage.setItem("product-basket", JSON.stringify(shoppingCart));
  updateUI();
}

// Decrease Count Function
function decreaseCount(productId) {
  const requiredItem = shoppingCart.find((item) => item.product_id === productId);
  
  if(requiredItem && requiredItem.product_count > 0) {
    requiredItem.product_count -= 1;
    if(requiredItem.product_count === 0) {
      shoppingCart = shoppingCart.filter((item) => item.product_count !== 0);
    }
  }else {
    return;
  }

  localStorage.setItem("product-basket", JSON.stringify(shoppingCart));
  updateUI();
}