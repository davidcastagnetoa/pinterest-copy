import React, { useState, useRef, useEffect } from "react";
import { useNavigate, navLink, Link, NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import logo from "../assets/AbigaelLogo.png";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import { categories } from "../utils/data";
import Switcher from './Switcher';

// import DarkBtn from "../DarkBtn";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-[#B8B1C0] dark:text-slate-400 hover:text-slate-200 hover:font-semibold dark:hover:text-white border-slate-400 transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center px-5 gap-3 text-red-600 dark:text-gold_btn_alternative_hover font-extrabold border-r-2 border-black dark:border-slate-400 transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, closeToggle }) => {
  //close sidebar when something
  const navigate = useNavigate();
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex flex-col justify-between h-full overflow-y-scroll min-w-210 android:max-w-[15rem] tablet:max-w-xs laptop:max-w-sm desktop:max-w-sm hide-scrollbar bg-gradient-to-t from-[#413418] to-[#1f1205] dark:bg-gh-bg-secondary from-gh-bg-secondary to-gh-bg-secondary border-r dark:border-[#9c704c5b]">
      <div className="flex flex-col">
        {/* Logo Link */}
        <Link
          to="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <img
            src={
              document.documentElement.classList == "dark" ? logo : logo
            }
            alt="logo"
            className="w-full"
          />
        </Link>
        {/* Sidebar Column */}
        <div className="flex flex-col gap-4 maxandroid:gap-3   text-base xl:text-lg">
          {/* Home Link */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill />
            Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base xl:text-lg 2xl:text-xl text-white">
            Discover categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              {/* <img src={category.image} alt="category" className="w-8 h-8 rounded-full shadow-sm" /> */}
              <BiCategoryAlt /> {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {/* {Dinamic Block of Code (DBC). Check if the user exists, if user exists, it will render this component} */}
      {/* If the user not exists, it render next Link */}
      <div className="w-fit flex justify-between my-5 mb-6 gap-5 mx-auto items-center">


        
      {/* <ul class="dropdown-inner dropdown-menu tw-top-4 tw-mt-[4px] tw-left-auto tw-right-0"><li><a id="downshift-2-item-0" role="option" aria-selected="true" class="menuitem highlighted"><div><small class="subdued">davidcastagnetoa@gmail.com</small></div></a></li><li><a id="downshift-2-item-1" role="option" aria-selected="false" class="menuitem">User settings</a></li><li><a id="downshift-2-item-2" role="option" aria-selected="false" class="menuitem">Netlify Labs</a></li><li><a id="downshift-2-item-3" role="option" aria-selected="false" class="menuitem">Sign out</a></li></ul> */}



        {/* User Profile */}
        {user && (
          <Link to={`user-profile/${user._id}`}>
            <img
              src={user.image}
              alt="user-profile"
              className="w-11 h-11 rounded-full border-transparent border"
            />
          </Link>
        )}
        
        {/* Toggle dark/light button */}
        <Switcher />

        {/* Logout button */}
        {user && (
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                type="button"
                style={{ display: "flex", gap: "0.25rem" }}
                className="w-11 h-11 text-gray-500 hover:text-gray-100 border-transparent border  font-medium rounded-full p-2.5  dark:text-white dark:hover:bg-gray-700 dark:hover:border-gold_btn_alternative_hover"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <ImExit fontSize={20} />
              </button>
            )}
            onLogoutSuccess={logout}
            cookiePolicy="single_host_origin"
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
