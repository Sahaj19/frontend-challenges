import  Styles  from "../css/Cart.module.css"

function Header() {
  return (
    <div className="container">
      <nav className={Styles.nav}>
        <h1>Shopping Cart</h1>
        <div className={Styles.cartItemsCount}>0</div>
      </nav>
    </div>
  )
}

export default Header;