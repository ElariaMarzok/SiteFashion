import React from "react";
import './header.css';
import { useShoppingBag } from './ShoppingBagContext';
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getTotalItems } = useShoppingBag();

  // Helper to scroll smoothly
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If already on Hero page => scroll. Else => go to Hero and then scroll using query
  const handleScrollOrNavigate = (sectionId) => {
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate(`/?scroll=${sectionId}`);
    }
  };

  return (
    <header className="header"> 
      <div className="header-left">
        <h3 className="logo"> Fashion</h3>
      </div>

      <nav className="header-center">
        <ul className="nav">
          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollOrNavigate("home");
              }}
            >
              HOME
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollOrNavigate("women-section");
              }}
            >
              WOMENS
            </a>
          </li>

          <li>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollOrNavigate("men-section");
              }}
            >
              MENS
            </a>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        <a
          href="#"
          className="icon"
          onClick={(e) => {
            e.preventDefault();
            navigate("/bag");
          }}
        >
          <i className="bi bi-bag"></i>
          <span className="bag">{getTotalItems()}</span>
        </a>
      </div>
    </header>
  );
}

export default Header;

