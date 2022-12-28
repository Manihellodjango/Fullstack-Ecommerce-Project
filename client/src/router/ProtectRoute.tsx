import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages";

type RootState = {
  user: {
    data: {
      isLoggedIn:boolean,
    },
  },
}

const Protected = () => {
  const isLoggedIn = useSelector((state:RootState) => state.user.data.isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Login />;
};

export default Protected;
