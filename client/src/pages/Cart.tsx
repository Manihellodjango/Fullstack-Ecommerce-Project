import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../features/cartSlice";
export const Cart = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: any) => state.cart);
  const { userData, token } = useSelector((state: any) => state.user.data);

  const removeFromCart = (id: any) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div>
      <div className="cart-title center">
        {token ? (
          <h2>
            Hello {userData.name}, you have{" "}
            {cartItems.length > 1 ? cartItems.length : 0} items to checkout
          </h2>
        ) : (
          <h2>Please login first to checkout {cartItems.length} these items</h2>
        )}
      </div>
      <div className="cart__card">
        {cartItems &&
          cartItems.map((cartItem: any) => {
            return (
              <div key={cartItem._id} className="cart">
                <img
                  className="cart-img"
                  src={`http://localhost:4002/api/products/photo/${cartItem._id}`}
                  alt={cartItem.name}
                />

                <h2>Name:{cartItem.name}</h2>

                <h3>
                  Price:
                  {cartItem.price.toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </h3>

                <p>Description:{cartItem.description.substring(0, 20)}...</p>

                <p>
                  Created at:{" "}
                  {moment(cartItem.createdAt).format("MMMM Do YYYY")}
                </p>
                <br></br>
                <button
                  className="cart__btn"
                  onClick={() => {
                    removeFromCart(cartItem._id);
                  }}
                >
                  <i className="fa fa-1x fa-trash"></i>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
