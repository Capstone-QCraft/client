import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  if (isLoggedIn) {
    return (
      <>
        <div className="nav-bg-box"></div>
        <nav>
          <Link
            // style={{
            //   width: "50px",
            //   height: "50px",
            // }}
            className="nav-logo"
            to="/project"
          >
            Qcraft
          </Link>
          <ul>
            <li>
              <NavLink
                className={(isActive) => "link" + (isActive ? " activate" : "")}
                aria-current="page"
                to="/"
              >
                소개
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) => "link" + (isActive ? " activate" : "")}
                aria-current="page"
                to="/question"
              >
                AI질문
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) => "link" + (isActive ? " activate" : "")}
                aria-current="page"
                to="/history"
              >
                기록
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(isActive) => "link" + (isActive ? " activate" : "")}
                aria-current="page"
                to="/user"
              >
                회원정보
              </NavLink>
            </li>
          </ul>
        </nav>
      </>
    );
  } else {
    return <div></div>;
  }
};

export default NavBar;
