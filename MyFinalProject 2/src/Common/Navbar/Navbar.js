import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [click, setClick] = useState(false);
  const history = useHistory();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const handleLogoutClick = () => {
    handleLogout();
    history.push("/login");
  };

  return (
    <>
      <nav className="navbar">
        <div className="container flex_space">
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : " fas fa-bars"}></i>
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to="/" onClick={closeMobileMenu}>
                HOME
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={closeMobileMenu}>
                BLOG
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMobileMenu}>
                CONTACT
              </Link>
            </li>
            <li>
              <Link to="/reviews" onClick={closeMobileMenu}>
                REVIEWS
              </Link>
            </li> {/* added link for reviews */}
            {isLoggedIn && (
              <li>
                <Link to="/MyBookings" onClick={closeMobileMenu}>
                  My Bookings
                </Link>
              </li>
            )}
          </ul>

          <div className="login-area flex">
            {isLoggedIn ? (
              <li>
                <Link to="/" onClick={handleLogoutClick}>
                  <i className="far fa-chevron-right"></i>Logout
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={closeMobileMenu}>
                    <i className="far fa-chevron-right"></i>Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <i className="far fa-chevron-right"></i>Register
                  </Link>
                </li>
              </>
            )}
          </div>
        </div>
      </nav>

      <header>
        <div className="container flex_space">
          {/* Logo and other header elements */}
        </div>

        <div className="contact flex_space ">
          {/* Contact information */}
        </div>
      </header>
    </>
  );
};

export default Navbar;
