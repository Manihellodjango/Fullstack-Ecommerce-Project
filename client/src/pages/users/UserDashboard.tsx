import React from "react";
import LoadingGif from "../../asset/images/Loading_2.gif";
import UserSidebar from "../../components/UserSidebar";
import { useFetchStoreData } from "../../hooks/useFetchStoreData";

export const UserDashboard = () => {
  // @ts-ignore
const {userData} = useFetchStoreData()

  return userData ? (
    <div className="container-full">
      {/* sidebar */}
      <UserSidebar userData={userData}/>
      {/* main content */}
      <div className="main-content">
        <div className="profile">
          <div>
            <h2>Hello, {userData.name}</h2>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <img className="profile" src={LoadingGif} alt="loading gif" />
  );
};
