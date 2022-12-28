import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Activate from "../components/Activate";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";
import { About, Cart, Home, Login, Register, Search, UserDashboard } from "../pages";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { Category } from "../pages/admin/Category";
import {Product} from "../pages/admin/Product";
import Products from "../pages/admin/Products";
import Shop from "../pages/Shop";
import Orders from "../pages/users/Orders";
import Profile from "../pages/users/Profile";
import AdminRoute from "./AdminRoute";
import Protected from "./ProtectRoute";


const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/search" element={<Search />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Protected />}>
            <Route path="user" element={<UserDashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/orders" element={<Orders />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/category" element={<Category />} />
            <Route path="admin/product" element={<Product />} />
            <Route path="admin/products" element={<Products />} />
          </Route>
          <Route path="/auth/activate/:jwtToken" element={<Activate />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
