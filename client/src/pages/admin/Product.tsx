import React, { useState, useEffect } from "react";
import LoadingGif from "../../asset/images/Loading_2.gif";
import AdminSidebar from "../../components/AdminSidebar";
import { createProduct, getCategories } from "../../services/AdminService";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFetchStoreData } from "../../hooks/useFetchStoreData";

type UseFetchStoreDataResult = {
  token: string,
  userData: {
    // structure of the userData object goes here
  }
}

export const Product = () => {

  const {token,userData:adminData} = useFetchStoreData() as UseFetchStoreDataResult;

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [shipping, setShipping] = useState("0");
  const [categoryId, setCategoryId] = useState("");
  const [photo, setPhoto] = useState("");

  const fetchCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(categories);
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handlePhotoChange = (e:any) => {
    setPhoto(e.target.files[0]);
  };
  const handleCategoryIdChange = (e:any) => {
    setCategoryId(e.target.value);
  };
  const handleNameChange = (e:any) => {
    setName(e.target.value);
  };
  const handleDescriptionChange = (e:any) => {
    setDescription(e.target.value);
  };
  const handlePriceChange = (e:any) => {
    setPrice(e.target.value);
  };
  const handleQuantityChange = (e:any) => {
    setQuantity(e.target.value);
  };
  const handleShippingChange = (e:any) => {
    setShipping(e.target.value);
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const newProduct = new FormData()
      newProduct.append("photo",photo)
      newProduct.append("name",name)
      newProduct.append("description",description)
      newProduct.append("price",price)
      newProduct.append("category",categoryId)
      newProduct.append("shipping",shipping)
      newProduct.append("quantity",quantity)

      await createProduct(newProduct, token)
      navigate("/dashboard/admin/products")
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
    setName("");
  };

  return adminData ? (
    <div className="container-full">
      {/* sidebar */}
      <AdminSidebar adminData={adminData} />
      <ToastContainer />
      {/* main content */}
      <div className="main-content">
        <div className="profile">
          <div>
            <h2> Create Product</h2>
            {photo && (
              <div>
                <img
                  className="product-img" // @ts-ignore
                  src={URL.createObjectURL(photo)}
                  alt="product"
                />
              </div>
            )}
            <div>
              <input
                type="file"
                name="photo"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
            <br></br>

            {/* show all the categories */}
            <div className="category">
              <label htmlFor="category">Select Category</label>
              <select
                name="category"
                id="category"
                onChange={handleCategoryIdChange}
              >
                {categories &&
                  categories.map((category) => {
                    const { _id, name } = category;
                    return (
                      <option key={_id} value={_id}>
                        {name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* form for categories */}
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="form__section">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                </div>
                <br></br>
                <div className="form__section">
                  <label htmlFor="description">Description:</label>
                  <textarea
                    name="description"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                  ></textarea>
                </div>
                <br></br>
                <div className="form__section">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    value={price}
                    onChange={handlePriceChange}
                  />
                </div>
                <br></br>
                <div className="form__section">
                  <label htmlFor="quantity">Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                </div>
                <br></br>
                <div className="form__section">
                  <label htmlFor="shipping">Shipping:</label>
                  <select name="shipping" id="shipping" onChange={handleShippingChange} value={shipping}>
                    <option value="0">Shipping Not Available</option>
                    <option value="1">Shipping is Available</option>
                  </select>
                </div>
                <br></br>

                <div className="form__section">
                  <button type="submit" className="btn">
                    Create Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};
