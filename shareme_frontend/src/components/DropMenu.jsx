import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/fetchUser";
import { GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const DropdownMenu = () => {
  const navigate = useNavigate();
  const user = fetchUser();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const menuClassName = isOpen ? "block " : "hidden";
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="relative">
      <button onClick={handleClick} type="button" className="hidden md:block">
        <img src={user?.picture} alt="user" className="w-14 h-12 rounded-lg" />
      </button>
      <div className={menuClassName}>
        <div className="border border-slate-400 dark:border-[#9c704c5b] z-10 w-[14rem] bg-l_gold_default rounded divide-y divide-slate-400 shadow dark:bg-gh-bg-default dark:divide-[#9c704c5b] absolute mt-1 right-0 left-auto top-auto">
          {/* User Data */}
          <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
            <div className="text-base font-medium dark:text-white text-black">
              {user?.name}
            </div>
            <div className="text-sm font-light dark:text-slate-400">
              {user?.email}
            </div>
          </div>
          {/* List Data */}
          <ul
            className="py-1 text-sm text-gray-700 dark:text-slate-400"
          >
            <li>
              <Link
                to={`user-profile/${user?.sub}`}
                className="text-sm font-normal block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gh-bg-primary dark:hover:text-white"
              >
                Profile
              </Link>
            </li>
          </ul>
          <div className="py-1 cursor-pointer">
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <li
                  type="button"
                  className="font-normal text-sm block py-2 px-4 text-gray-700 hover:bg-gray-100 dark:hover:bg-gh-bg-primary dark:text-slate-400 dark:hover:text-white"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign out
                </li>
              )}
              onLogoutSuccess={logout}
              cookiePolicy="single_host_origin"
            />
            {/* <a
              href="#"
              className="font-normal text-sm block py-2 px-4  text-gray-700 hover:bg-gray-100 dark:hover:bg-gh-bg-primary dark:text-slate-400 dark:hover:text-white"
            >
              Sign out
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownMenu;
