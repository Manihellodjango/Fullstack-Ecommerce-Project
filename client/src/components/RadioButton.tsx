import React from "react";


//@ts-ignore
const RadioButton = ({ price, onHandleSelectedPrice }) => {
  const handleChange = (price: any) => {
    onHandleSelectedPrice(price);
  };
  return (
    <div>
      <input
        type="radio"
        name="price"
        value={price.range}
        onChange={() => { 
          handleChange(price.range);
        }}
      />
      <label htmlFor="category">{price.name}</label>
    </div>
  );
};

export default RadioButton;
