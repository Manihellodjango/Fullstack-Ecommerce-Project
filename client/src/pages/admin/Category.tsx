import React, { useState, useEffect } from "react";
import LoadingGif from "../../asset/images/Loading_2.gif";
import AdminSidebar from "../../components/AdminSidebar";
import { ToastContainer, toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../services/AdminService";
import { useFetchStoreData } from "../../hooks/useFetchStoreData";

type UseFetchStoreDataResult = {
  token: string,
  userData: {
    // structure of the userData object goes here
  }
}

export const Category = () => {

  const {token,userData:adminData} = useFetchStoreData() as UseFetchStoreDataResult;
 

  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { categories } = await getCategories();
      setCategories(categories);
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleDelete = async (id: any) => {
    try {
      const { data } = await deleteCategory({ id, token });
      toast.success(data.message);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await createCategory({ name, token });
      toast.success(data.message);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
    setName("");
  };

  return adminData ? (
    
    <div className="container-full">
      {/* sidebar */}
      <AdminSidebar adminData={adminData} />
      {/* main content */}
      <div className="main-content">
        <div className="profile">
          <div>
            <h2>Category Page</h2>
            <ToastContainer />
            <div className="card">
              <form onSubmit={handleSubmit}>
                <div className="form__section">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={handleInputChange}
                  />
                </div>
                <br></br>
                <div className="form__section">
                  <button type="submit" className="btn">
                    Create Category
                  </button>
                </div>
              </form>
            </div>
            <div>
              <h2>All the categories are here</h2>
              <div className="categories__list">
                {categories &&
                  categories.map((category) => {
                    return (
                      //@ts-ignore
                      <div key={category._id} >
                         {/* @ts-ignore */}
                        <button>{category.name}</button>
                        <div>
                          <button className="btn1">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="trash  btn"
                            onClick={() => {
                              // @ts-ignore
                              handleDelete(category._id);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};
