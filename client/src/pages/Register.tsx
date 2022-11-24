import React, { useState } from "react";
import axios from "axios"

export const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post(" http://localhost:4000/api/users/register",user);
    console.log(response.data.message)
  };

  return (
    <div>
      <h1>User Registration</h1>
      <div className="card">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-control">
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
          <div className="form-control">
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
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={handleInputChange}
            />
          </div>{" "}
          <br></br>
          <div className="form-control">
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={user.phone}
              onChange={handleInputChange}
            />
          </div>{" "}
          <br></br>
          <div className="form-control">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};
