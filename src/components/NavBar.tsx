import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navDesktop = () => {
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
            to="/"
          >
            Qcraft
          </Link>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  "link" + (isActive ? " activate" : "")
                }
                aria-current="page"
                to="/"
              >
                소개
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  "link" + (isActive ? " activate" : "")
                }
                aria-current="page"
                to="/question"
              >
                AI질문
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  "link" + (isActive ? " activate" : "")
                }
                aria-current="page"
                to="/history"
              >
                기록
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  "link" + (isActive ? " activate" : "")
                }
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
  };

  const navMovile = () => {
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
            to="/"
          >
            Qcraft
          </Link>
          <button className="nav-menu-list-button">=</button>
        </nav>
        <div className="nav-menu-list-container"></div>
      </>
    );
  };

  if (isLoggedIn) {
    if (windowWidth < 768) {
      return navMovile();
    } else {
      return navDesktop();
    }
  } else {
    return <></>;
  }
};

export default NavBar;
