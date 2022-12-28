import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import {  Login } from "../pages";

type RootState = {
  user: {
    data: {
      isLoggedIn:boolean,
      userData: {
        isAdmin: boolean,
      },
    },
  },
}

const AdminRoute = () => {
  
  const isAdmin = useSelector((state:RootState) => state.user.data.userData.isAdmin);
  
  const isLoggedIn = useSelector((state:RootState) => state.user.data.isLoggedIn);
  return isLoggedIn && isAdmin ? <Outlet /> : <Login />;
};

export default AdminRoute;
