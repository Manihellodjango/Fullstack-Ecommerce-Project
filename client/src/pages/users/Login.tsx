import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/UserService";
import { useDispatch} from "react-redux";
import { login } from "../../features/userSlice";

export const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setValue((prevState) => {
      return { ...prevState, [event.target.name]: event.target.value };
    });
  };

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await loginUser(value);
      const { token, user } = response;
      const role = user.isAdmin ? "admin" : "user"
      dispatch(login({token, user}));
      navigate(`/dashboard/${role}`);
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
    setValue({
      email: "",
      password: "",
    });
  };

  return (
    <div className="reg-registration-form">
     <div className="login-form">
     <div className="form">
      <div className="form-heading">
      <h1 >User Login</h1>
      </div>
      <ToastContainer />
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={value.email}
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
              value={value.password}
              onChange={handleInputChange}
            />
          </div>
          <br></br>
          <div className="form__section">
            <button type="submit" className="btn">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>

      </div> 
    </div>
    
  );
};
