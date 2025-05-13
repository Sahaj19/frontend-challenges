import  Styles  from "../css/Cart.module.css"
import PropTypes from "prop-types";

function Header({totalItemsCount}) {
  return (
    <div className="container">
      <nav className={Styles.nav}>
        <h1>Shopping Cart</h1>
        <div className={Styles.cartItemsCount}>{totalItemsCount}</div>
      </nav>
    </div>
  )
}

Header.protTypes = {
  totalItemsCount: PropTypes.number
}

export default Header;