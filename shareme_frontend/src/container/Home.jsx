import React, { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import { userQuery } from "../utils/data";
import { client } from "../client";
import logo from "../assets/AbigaelLogo.png";
import { fetchUser } from "../utils/fetchUser";

const Home = ({}) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex text-slate-900 dark:text-white sm:flex-row flex-col h-screen transition-height duration-75 ease-out">
      <div className="hidden sm:flex h-[calc(100vh - 2rem)] flex-initial">
        {/* Mobile Sidebar */}
        <Sidebar user={user && user} />
      </div>
      {/* Head in small devices */}
      <div className="flex sm:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md bg-gradient-to-t from-[#2c2310] to-[#110a03] dark:from-gh-bg-secondary dark:to-gh-bg-secondary border-b dark:border-slate-800/90 border-slate-900/10">
          <HiMenu
            fontSize={40}
            className="cursor-pointer text-slate-200 dark:text-gold_btn_alternative_hover"
            onClick={() => setToggleSidebar(true)}
          />
          {/* Logo Shareme */}
          <Link to="/">
            <img
              src={document.documentElement.classList === "dark" ? logo : logo}
              alt="logo"
              className="w-1/2"
            />
          </Link>

          {/* Image Profile */}
          {/* If the user is login return user profile link */}
          {user && (
            <Link
              to={`user-profile/${user?._id}`}
              className="flex flex-col items-center androidWeb:flex-row-reverse"
            >
              <img
                src={user?.image}
                alt="logo"
                className="w-14 rounded-full "
              />
              <h1 className="pt-2 text-sm font-light text-slate-300 maxandroid:hidden androidWeb:pr-2 pt-0">
                {user?.userName}
              </h1>
            </Link>
          )}
        </div>
        {/* Toggle Button SideBar Elements */}
        {toggleSidebar && (
          // blur filter and width full screen (w-screen) (Optional)
          <div
            // onClick={() => setToggleSidebar(false)}
            className="fixed w-screen text-gray-800 dark:text-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in backdrop-blur-sm"
          >
            <div className="absolute w-full flex justify-end items-center p-2 overflow-y-auto android:max-w-[15rem] tablet:max-w-xs laptop:max-w-sm desktop:max-w-sm">
              <AiFillCloseCircle
                fontSize={30}
                className="cursor-pointer rounded-full bg-slate-300 dark:bg-slate-300 text-l_gold_btn_alternative dark:text-gold_btn_alternative_hover hover:text-l_gold_btn_alternative_hover dark:hover:text-gold_btn_alternative"
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            {/* Desktop Sidebar */}
            <Sidebar closeToggle={setToggleSidebar} user={user && user} />
          </div>
        )}
      </div>
      {/* Body */}
      <div
        id="about"
        className="pb-2 flex-1 h-screen overflow-y-scroll bg-l_gold_default dark:bg-gh-bg-default"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;

// Texte Gradient
// https://redpixelthemes.com/blog/tailwindcss-gradient-text/
// https://tailwindcolor.com/
