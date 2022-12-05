import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { GiSave } from "react-icons/gi";
import { GoDesktopDownload, GoPin } from "react-icons/go";
import { BsFillTrash2Fill } from "react-icons/bs";
import { GiOverkill } from "react-icons/gi";
import { client, urlFor } from "../client";
import { fetchUser } from "../utils/fetchUser";
import { pinDetailMorePinQuery, pinDetailQuery } from "../utils/data";
import { feedQuery, searchQuery } from "../utils/data";
import Pin from "./Pin";
import {MyEstadoGlobalContext} from './MyEstadoGlobalContext';



// import { Button } from 'semantic-ui-react';


const Popup = ({pinToPopup}) => {
  const {popup, setPopup} = React.useContext(MyEstadoGlobalContext);
  const navigate = useNavigate();
  const user = fetchUser();
  console.log(user?.sub);

  return (
    <div 
      onClick={(e) => {
        setPopup(false);
          e.stopPropagation();
      }}
      id="popup-modal"
      tabIndex="-1"
      className="fixed z-50 p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full backdrop-blur-sm"
    >
      {/* {pinToPopup} */}
      <div className="top-[calc(25vh)] relative w-full h-full max-w-md md:h-auto m-auto">
        <div className="relative bg-sd_l_bg_primary rounded-lg shadow dark:bg-gh-bg-primary">
          <button
            onClick={(e) => {
              setPopup(false);
              e.stopPropagation();
            }}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="p-6 text-center">
            <GiOverkill fontSize={70} className="m-auto my-6" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this pin?
            </h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // deletePin(pinId._id);
              }}
              className="font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2      bg-sd_btn_alternative border-sd_btn_alternative_hover text-white hover:bg-sd_btn_alternative_hover active:shadow-active dark:bg-gh_btn_alternative dark:hover:bg-gh_btn_alternative_hover shadow-primary border-default border-solid border-sd_btn_alternative_hover dark:border-transparent rounded-lg"
            >
              Yes, I'm sure
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPopup(false);
              }}
              type="button"
              className="rounded-lg text-sm font-medium px-5 py-2.5        bg-sd_btn_primary border-sd_btn_primary_hover text-light hover:bg-sd_btn_primary_hover active:shadow-active dark:text-white dark:bg-gh_btn_primary dark:hover:bg-gh_btn_primary_hover shadow-primary border-default border-solid border-sd_btn_primary_hover dark:border-transparent rounded-lg"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
