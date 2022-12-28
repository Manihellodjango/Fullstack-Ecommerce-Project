import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = ({ adminData }: { adminData: any }) => {
  return (
    <div className="sidebar">
      <h2 className="center">Admin profile</h2>
      <div className="info">
        <i className="fa-solid fa-user fa-3x round"></i>
        <h2>{adminData.name}</h2>
        <h2>{adminData.email}</h2>
      </div>
      <ul className="sidebar__lists">
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/category">Category</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/product">Product</NavLink>
        </li>
        <li className="sidebar__list">
          <NavLink to="/dashboard/admin/products">List All Products</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
