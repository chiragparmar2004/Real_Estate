import "./Navbar.scss";
import { PiBuildingsLight } from "react-icons/pi";
import { GrMenu } from "react-icons/gr";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <PiBuildingsLight className="logoIcon" />
          <span>Real_Estate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>
      <div className="right">
        <Link to="/">Sign in</Link>
        <Link to="/" className="register">
          Sign up
        </Link>
        <div className="menuIcon">
          <GrMenu
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Sign in</Link>
          <Link to="/">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
