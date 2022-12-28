import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../services/AdminService";

const SearchForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate()


  const handleSubmit = async(e: any) => {
    try {
      e.preventDefault()
      const response = await searchProducts(searchValue)
      navigate("/search", {state:response})

      console.log(response)
    } catch (error: any) {
      console.log(error)
    }


  };
  return (
    <form  className="search" onSubmit={handleSubmit}>
      <input
        type="text"
        className="searchterm"
        placeholder="What are you looking for?"
        onChange={(e) =>{
          setSearchValue(e.target.value)

        }}
        value= {searchValue}
        autoFocus
      />
      <button type="submit" className="searchbutton">
        {" "}
        Search
      </button>
    </form>
  );
};

export default SearchForm;
