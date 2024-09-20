import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showNavMenuList, setShowNavMenuList] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLogo = () => {
    return (
      <Link className="nav-logo" to="/">
        Qcraft
      </Link>
    );
  };

  const navItems = () => {
    return (
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              "link" + (isActive ? " activate" : " nomal")
            }
            aria-current="page"
            to="/"
            onClick={navMenuListHandler}
          >
            소개
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              "link" + (isActive ? " activate" : " nomal")
            }
            aria-current="page"
            to="/question"
            onClick={navMenuListHandler}
          >
            AI질문
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              "link" + (isActive ? " activate" : " nomal")
            }
            aria-current="page"
            to="/history"
            onClick={navMenuListHandler}
          >
            기록
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              "link" + (isActive ? " activate" : " nomal")
            }
            aria-current="page"
            to="/user"
            onClick={navMenuListHandler}
          >
            회원정보
          </NavLink>
        </li>
        <li>
          <Link
            className="nav-logout"
            to="/"
            onClick={() => {
              // todo 로그아웃 로직
              navMenuListHandler();
            }}
          >
            로그아웃
          </Link>
        </li>
      </ul>
    );
  };

  const navDesktop = () => {
    return (
      <>
        <div className="nav-bg-box"></div>
        <nav>
          {navLogo()}
          {navItems()}
        </nav>
      </>
    );
  };

  const navMenuListHandler = () => {
    const box = document.getElementById("nav-menu-list-container");
    if (box) {
      if (showNavMenuList) {
        box.style.height = "0"; // nav 메뉴 리스트 숨기기
        box.style.opacity = "0";
        document.body.style.overflow = "auto"; // 스크롤 활성화
        setShowNavMenuList(!showNavMenuList);
      } else {
        box.style.height = "100%"; // nav 메뉴 리스트 보이기
        box.style.opacity = "1";
        document.body.style.overflow = "hidden"; // 스크롤 비활성화
        setShowNavMenuList(!showNavMenuList);
      }
    }
  };

  const navMovile = () => {
    return (
      <>
        <div className="nav-bg-box"></div>
        <nav>
          {navLogo()}
          <button className="nav-menu-list-button" onClick={navMenuListHandler}>
            =
          </button>
        </nav>
        <div id="nav-menu-list-container" className="nav-menu-list-container">
          <div className="nav-menu-list-button-container">
            <button
              className="nav-menu-list-button"
              onClick={navMenuListHandler}
            >
              x
            </button>
          </div>
          {navItems()}
        </div>
      </>
    );
  };

  if (isLoggedIn) {
    if (windowWidth < 768) {
      return navMovile();
    } else {
      if (showNavMenuList) navMenuListHandler();
      return navDesktop();
    }
  } else {
    return <></>;
  }
};

export default NavBar;
