import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { accountActivation } from "../services/UserService";

const Activate = () => {
  const { jwtToken } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    //@ts-ignore
    const { name } = jwtDecode(jwtToken);
    console.log(name);

    if (jwtToken) {
      setName(name);
      setToken(jwtToken);
    }
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      await accountActivation({ token });
      navigate("/login");
    } catch (error:any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <h1>Hello {name}, Ready to activate your account?</h1>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Activate Account
        </button>
      </div>
    </div>
  );
};

export default Activate;
