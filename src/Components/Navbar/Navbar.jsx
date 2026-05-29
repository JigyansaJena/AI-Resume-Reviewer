import React from "react";
import "./Navbar.css";
import { Search, FileSearch } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-div">
        <div className="logo-div">
          <div className="logo">
            <FileSearch color="white" size={20} />
          </div>
          <p className="heading">
            Resume<span>Lens</span>
          </p>
        </div>
        <div className="nav-right">
          <p>AI powered resume feedback</p>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
