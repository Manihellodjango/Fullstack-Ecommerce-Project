import React, { useState, useEffect } from "react";
import { useFetchStoreData } from "../hooks/useFetchStoreData";
import LoadingGif from "../asset/images/Loading_2.gif";
import ProductList from "../components/ProductList";
import { getFilteredProducts, getProducts } from "../services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import { getCategories } from "../services/AdminService";
import CheckBox from "../components/CheckBox";
import RadioButton from "../components/RadioButton";
import SearchForm from "../components/SearchForm";

const prices = [
  { _id: 0, name: "Any", range: [] },
  { _id: 1, name: "$0 to $ 49", range: [0, 49] },
  { _id: 2, name: "$50 to $99", range: [50, 99] },
];
  

const Shop = () => {
  const { userData: adminData } = useFetchStoreData();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedPrice, setCheckedPrice] = useState([]);

  const fetchProducts = async () => {
    try {
      //@ts-ignore
      const response = await getProducts();
      setProducts(response.products);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const fetchCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(categories);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await getFilteredProducts(
        checkedCategories,
        checkedPrice
      );
      setProducts(response);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (!checkedCategories.length || !checkedPrice.length) {
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (checkedCategories.length || checkedPrice.length) {
      fetchFilteredProducts();
    }
  }, [checkedCategories, checkedPrice]);

  
  const handleSelectedCategory = (categoryName: any) => {
    //@ts-ignore
    if (checkedCategories.includes(categoryName)) {
      const filteredItems = checkedCategories.filter((c) => c !== categoryName);
      setCheckedCategories(filteredItems);
    } else {
    }
    //@ts-ignore
    setCheckedCategories((prevState) => [...prevState, categoryName]);
  };

  const handleSelectedPrice = (price: any) => {
    setCheckedPrice(price);
  };

  return adminData ? (
    <div className="container-full">
      <ToastContainer />
      <div className="sidebar">
        <div>
          <h3>Filter By Categories</h3>
          <div>
            {categories && //@ts-ignore
              categories.map((category) => (
                <CheckBox //@ts-ignore
                  key={category._id}
                  category={category}
                  onHandleSelectedCategory={handleSelectedCategory}
                />
              ))}
          </div>
        </div>
        <br></br>
        <div>
          <h3>Filter By Price</h3>
          <div>
            {prices &&
              prices.map((price) => (
                <RadioButton
                  key={price._id}
                  price={price}
                  onHandleSelectedPrice={handleSelectedPrice}
                />
              ))}
          </div>
        </div>
        <button
          className="btn1"
          onClick={() => {
            window.location.reload();
          }}
        >
          Reset
        </button>
      </div>

      <div className="main-content">
        <div className="search">
          <SearchForm />
        </div>

        <div>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};

export default Shop;
