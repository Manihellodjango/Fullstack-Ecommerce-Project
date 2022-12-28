import React from "react";
import LoadingGif from "../../asset/images/Loading_2.gif";
import AdminSidebar from "../../components/AdminSidebar";
import { useFetchStoreData } from "../../hooks/useFetchStoreData";

export const AdminDashboard = () => {

  const {userData:adminData}: {userData: any} = useFetchStoreData()

  return adminData ? (
    <div className="container-full">
      {/* sidebar */}
      <AdminSidebar adminData={adminData}/>
      {/* main content */}
      <div className="main-content">
        <div className="profile">
          <div>
            <h2>Hello, {adminData.name}</h2>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};
