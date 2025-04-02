import Header from "./components/Header";
import Products from "./components/Products";
import productDetailsArray from "./productsData/data.json";

function App() {
  return (
    <>
    <Header/>
    <Products productDetailsArray={productDetailsArray}/>
    </>
  )
}

export default App;