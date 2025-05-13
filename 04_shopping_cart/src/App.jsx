import { useEffect, useState } from "react";
import Header from "./components/Header";
import Products from "./components/Products";
import productDetailsArray from "./productsData/data.json";

function App() {
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  // Function to update the total item count
  const updateTotalItemsCount = (newCount) => {
    setTotalItemsCount(newCount);
  };
  
  useEffect(() => {
    const storredCart = JSON.parse(localStorage.getItem("product-basket")) || [];
    const totalCount = storredCart.reduce((acc,curr) => {
      return acc + curr.product_count
    },0);
    setTotalItemsCount(totalCount);
  },[])

  return (
    <>
    <Header totalItemsCount={totalItemsCount}/>
    <Products productDetailsArray={productDetailsArray} updateTotalItemsCount={updateTotalItemsCount}/>
    </>
  )
}

export default App;