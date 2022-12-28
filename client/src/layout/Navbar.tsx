import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import Carticon from "../components/Carticon";


const Navbar = () => {

  const data = useSelector((state:any) => state.user.data);
  const {cartItems} = useSelector((state:any) => state.cart)
  const isAdmin = data.userData.isAdmin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <nav>
      <div className="nav-design">
        <div className="nav-design-image">
          <img src="/images/logo.jpg" alt="logo" />
        </div>
        <div style={{ margin: "auto" }}>
          <NavLink className="header-links" to="/">
            Home
          </NavLink>
          <NavLink className="header-links" to="/shop">
            Shop
          </NavLink>

          {!data.isLoggedIn && (
            <>
              <NavLink className="header-links" to="/register">
                Register
              </NavLink>
              <NavLink className="header-links" to="/login">
                Login
              </NavLink>
            </>
          )}
          <NavLink className="header-links" to="/about">
            Products
          </NavLink>

          {data.isLoggedIn && (
            <div className="dropdown">
              <button className="dropbtn">{data.userData.name}</button>
              <ul className="dropdown-content">
                <li>
                  <NavLink
                    className="nav__link"
                    to="/logout"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="nav__link"
                    to={`dashboard/${isAdmin === 1 ? "admin" : "user"}`}
                    onClick={handleLogout}
                  >
                    Dashboard
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <NavLink className="header-links" to="/cart">
          <Carticon value={cartItems.length >= 1 ? cartItems.length : 0}/>
         </NavLink>
      </div>
      
    </nav>
  );
};

export default Navbar;
