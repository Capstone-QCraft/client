import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import logoLight from "../assets/images/logo-light.png";
import logoDark from "../assets/images/logo-dark.png";

enum DEVICE_TYPE {
  DESKTOP = "desktop",
  MOBILE = "mobile",
}

const NavItems = [
  ["소개", "/"],
  ["AI질문", "/ai"],
  ["기록", "/history"],
  ["내정보", "/user"],
];

const NavBar = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNavMenuList, setShowNavMenuList] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const navLogo = () => {
    return (
      <Link className="nav-img" to="/">
        <img
          className="nav-img"
          src={isDarkMode ? logoDark : logoLight}
          alt="로고"
        />
      </Link>
    );
  };

  const navLogout = (str: DEVICE_TYPE) => {
    return (
      <li className={`nav-li-${str}`}>
        <Link
          className={`nav-logout-${str}`}
          to="/"
          onClick={() => {
            /* 로그아웃 로직 */
          }}
        >
          로그아웃
        </Link>
      </li>
    );
  };

  const navLinkDesktop = (content: string, url: string) => {
    return (
      <li className="nav-li-desktop" key={DEVICE_TYPE.DESKTOP + url}>
        <NavLink
          className={({ isActive }) =>
            "link" + (isActive ? " activate-desktop" : "") + " nav-a-desktop"
          }
          aria-current="page"
          to={url}
        >
          {content}
        </NavLink>
      </li>
    );
  };

  const navLinkMobile = (content: string, url: string) => {
    return (
      <li className="nav-li-mobile" key={DEVICE_TYPE.MOBILE + url}>
        <NavLink
          className={({ isActive }) =>
            "link" + (isActive ? " activate-mobile" : "") + " nav-a-mobile"
          }
          aria-current="page"
          to={url}
          onClick={navMenuListHandler}
        >
          {content}
        </NavLink>
      </li>
    );
  };

  const navDesktop = () => {
    return (
      <>
        <div className="nav-bg-box"></div>
        <nav>
          {navLogo()}
          <ul className="nav-ul-desktop">
            {NavItems.map((item) => navLinkDesktop(item[0], item[1]))}
            {navLogout(DEVICE_TYPE.DESKTOP)}
          </ul>
        </nav>
      </>
    );
  };

  const navMenuListHandler = () => {
    const menuIcon = document.querySelector(".menu-icon");
    if (menuIcon) menuIcon.classList.toggle("open");

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
        <nav>{navLogo()}</nav>
        <div id="nav-menu-list-container" className="nav-menu-list-container">
          <ul className="nav-ul-mobile">
            {NavItems.map((item) => navLinkMobile(item[0], item[1]))}
            {navLogout(DEVICE_TYPE.MOBILE)}
          </ul>
        </div>
        <div className="menu-icon" onClick={navMenuListHandler}>
          <div className="line top"></div>
          <div className="line middle"></div>
          <div className="line bottom"></div>
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
