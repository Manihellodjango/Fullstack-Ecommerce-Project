import React, { useState, useEffect } from "react";
import LoadingGif from "../../asset/images/Loading_2.gif";
import AdminSidebar from "../../components/AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import {  getProducts } from "../../services/AdminService";
import { useFetchStoreData } from "../../hooks/useFetchStoreData";
import ProductList from "../../components/ProductList";


type UseFetchStoreDataResult = {
  token: string,
  userData: {
    // structure of the userData object goes here
  }
}

const Products = () => {

  const {token,userData:adminData} = useFetchStoreData() as UseFetchStoreDataResult;


  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      //@ts-ignore
      const response= await getProducts();
      setProducts(response.products);
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return adminData ? (
    <div className="container-full">
      {/* sidebar */}
      <AdminSidebar adminData={adminData} />
      {/* main content */}
      <div className="main-content">
        <div className="profile">
          <div>
            <ToastContainer />
            <div className="profile">
              <h2>List of All Products</h2>
               <ProductList  products={products}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};

export default Products;
