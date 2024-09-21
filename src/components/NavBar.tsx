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

  const navShowButton = (src: string, alt: string) => {
    return (
      <img
        className="nav-img"
        src={src}
        onClick={navMenuListHandler}
        alt={alt}
      />
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
      <li className="nav-li-desktop">
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
      <li className="nav-li-mobile">
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
            {navLinkDesktop("소개", "/")}
            {navLinkDesktop("AI질문", "/ai")}
            {navLinkDesktop("기록", "/history")}
            {navLinkDesktop("내정보", "/user")}
            {navLogout(DEVICE_TYPE.DESKTOP)}
          </ul>
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
          {navShowButton(isDarkMode ? logoLight : logoDark, "nav-open")}
        </nav>
        <div id="nav-menu-list-container" className="nav-menu-list-container">
          <div className="nav-show-button-container">
            {navShowButton(isDarkMode ? logoDark : logoLight, "nav-open")}
          </div>
          <ul className="nav-ul-mobile">
            {navLinkMobile("소개", "/")}
            {navLinkMobile("AI질문", "/ai")}
            {navLinkMobile("기록", "/history")}
            {navLinkMobile("내정보", "/user")}
            {navLogout(DEVICE_TYPE.MOBILE)}
          </ul>
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
