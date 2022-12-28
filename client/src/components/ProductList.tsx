import React from "react";
import Badge from "./Badge";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";

export const ProductList = ({ products }: { products: any }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="products__card">
      {products &&
        products.map((product: any) => {
          return (
            <div className="product" key={product._id}>
              <img
                className="product-img"
                src={`http://localhost:4002/api/products/photo/${product._id}`}
                alt={product.name}
              />
              <Badge quantity={product.quantity} sold={product.sold} />

              <h2>Name:{product.name}</h2>

              <h3>
                Price:
                {product.price.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </h3>

              <p>Description:{product.description}</p>

              <p>
                created at: {moment(product.createdAt).format("MMMM Do YYYY")}
              </p>
              <div>
                <button className="btn1">Show details</button>
                <button
                  className="btn1"
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductList;
