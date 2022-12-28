import React from "react";

const Carticon = ({value}: {value: any}) => {
  return (
    <div className="cart-icon">
      <i className="fa fa-2x fa-shopping-cart"></i>
      <span className="badge">{value}</span>
    </div>
  );
};

export default Carticon;
