import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Contact, Home, Login, Profile, Register } from "../pages";
import { Error } from "../pages/Error";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default Index;
