import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerUser } from "../../services/UserService";

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await registerUser(user);
      toast(response.message);
    } catch (error: any) {
      toast(error.response.data.error);
    }
    setUser({
      name: "",
      email: "",
      password: "",
      address: "",
    });
  };

  return (
    <div className="reg-registration-form" >
      <div className="registration-form">
        <div className="form">
          <div className="form-heading">
            <h1 >User Registration</h1>
          </div>
          <ToastContainer />
          <div className="card">
            <form onSubmit={handleSubmit}>
              <div className="form__section">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={user.name}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div className="form__section">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div className="form__section">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div className="form__section">
                <label htmlFor="address">Address:</label>
                <input
                  name="address"
                  id="address"
                  value={user.address}
                  onChange={handleInputChange}
                />
              </div>
              <br></br>
              <div className="form__section">
                <button type="submit" className="btn">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
