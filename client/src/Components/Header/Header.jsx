import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
export default function Header() {
  return (
    <div>
      <nav className="nav-bar">
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Account</Link>
        <Link to={"/"}>Setting</Link>
        <a href="/auth/login">Login</a>
      </nav>
    </div>
  );
}
