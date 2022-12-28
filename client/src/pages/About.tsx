import React, { useState, useEffect } from "react";
import LoadingGif from "../asset/images/Loading_2.gif";
import { toast } from "react-toastify";
import {
  getProducts,
  getTotalNumberOfProducts,
} from "../services/AdminService";
import { useFetchStoreData } from "../hooks/useFetchStoreData";
import ProductList from "../components/ProductList";

export const About = () => {
  // @ts-ignore
  const { userData: adminData } = useFetchStoreData();

  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      //@ts-ignore
      const response = await getProducts();
      setProducts(response.products);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const countTotalProducts = async () => {
    try {
      const response = await getTotalNumberOfProducts();
      setTotalProducts(response);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
  const loadMoreProducts = async () => {
    try {
      const response = await getProducts(page); //@ts-ignore
      setProducts([...products, ...response.products]);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchProducts();
    countTotalProducts();
  }, []);

  useEffect(() => {
    if(page === 1 ){
      return
    }
    loadMoreProducts()

  }, [page]);

  const temProducts = [...products];
  //@ts-ignore
  const sortedBySold = temProducts.sort((a, b) => (a.sold < b.sold ? 1 : -1));

  return adminData ? (
    <div className="container-full">
      <div className="main-content">
        <div>
          <label htmlFor="">Sort By:</label>
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
          >
            <option value="date">date</option>
            <option value="sortBy">Sold</option>
          </select>
          <div className="profile">
            {products && sortBy === "date" && <ProductList products={products} />}
            {products && sortBy === "sold" && <ProductList products={sortedBySold} />}
          </div>
          {/* <h2>
            Total number of products:
            {totalProducts}
          </h2> */}
          <div className="center">
            {products && products.length < totalProducts && (
              <button
                className="btn1"
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};

export default About;
