import React from "react";
import { useNavigate } from "react-router-dom";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="center profile">
      <h2>404 ! page not found</h2>
      <button
        className="btn"
        onClick={() => {
          navigate("/", { replace: true });
        }}
      >
        {" "}
        Go to home Page
      </button>
    </div>
  );
};
