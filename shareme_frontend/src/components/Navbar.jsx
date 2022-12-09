import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import DropdownMenu from "./DropMenu";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 mb-3">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-l_gold_primary dark:bg-gh-bg-primary border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={25} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate('/search')}
          className='p-2 w-full bg-l_gold_primary dark:bg-gh-bg-primary outline-none'
        />
      </div>
      <div className="flex gap-3">
        <DropdownMenu />
        <Link to='create-pin' className='w-12 h-12 md:w-14 md:h-12 flex justify-center items-center bg-l_gold_btn_alternative border-l_gold_btn_alternative_hover text-white hover:bg-l_gold_btn_alternative_hover active:shadow-active dark:bg-gold_btn_alternative dark:hover:bg-gold_btn_alternative_hover shadow-primary border-default border-solid dark:border-transparent rounded-lg'>
          <IoMdAdd fontSize={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
