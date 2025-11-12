import React from "react";
import "./css/cart.css";
import { CiShoppingBasket } from "react-icons/ci";

function Cart({ onClose }) {
  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <div className="cart-header-left">
            <div className="cart-header-icon">
              <CiShoppingBasket />
            </div>
            <h3>Mi Carrito</h3>
          </div>
          <button className="cart-close-btn" onClick={onClose}>✖</button>
        </div>

        <div className="cart-body">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <CiShoppingBasket />
            </div>
            <h4>Tu carrito está vacío</h4>
            <p>Agrega productos para comenzar tu compra</p>
            <button className="cart-btn">Seguir comprando</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
