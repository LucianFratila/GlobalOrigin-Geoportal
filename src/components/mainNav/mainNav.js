import React, { useState } from "react";
import { Link } from "react-router-dom";
////React Icons Imports//////
import { IoMdArrowDropleft } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

////Component imports////
import MainMenuTabs from "./mainMenuTabs";

////Utilis Imports////
import useStore from "common/utils/stateStore/useStore";




const MainNav = ({ children,logout,user }) => {
  //const user = localStorage.getItem("user");
  
  ///Menu Visibility Controls///
  const mainNavVisibility = useStore((state) => state.mainNavVisibility);
  const toggleMainNav = useStore(state => state.toggleMainNav);
  

  return (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className='absolute z-50 h-[100%]   '>
          <div
            className={`bg-primary/95 overflow-x-auto  h-[100%]   ${
              mainNavVisibility ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-16`
            } duration-1000`}
          >
            <div className={`grid grid-cols-2  whitespace-nowrap items-center`}>
            
              {/* Menu Header */}
              <div className={`${!mainNavVisibility && "opacity-0"} transition delay-300 duration-600 p-4 `}>
                <h1 className='text-xl text-maintext '>Gabon Geoportal</h1>
                <p className='text-xs text-maintext flex items-center gap-1 '>
                  {user}
                  <button className=' hover:text-white'>
                    <IoMdArrowDropdown size={20} />
                  </button>
                  
                </p>
                <button onClick={logout}>logout</button>
                  <Link to='/login'>Login</Link>
              </div>
              {/* Menu Header */}

              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button
                  className={` bg-gray-600 hover:bg-gray-500 px-3 py-2  rounded-md duration-300  ${
                    !mainNavVisibility && "scale-0"
                  }  `}
                >
                  <AiOutlineSearch className=' text-maintext text-2xl' />
                </button>
                <button
                  onClick={toggleMainNav}
                  className={`${!mainNavVisibility ? "bg-gray-600 hover:bg-gray-500 px-1 py-2  rounded-md" : ""}`}
                >
                  {!mainNavVisibility ? (
                    <IoMdArrowDropleft
                      className={`text-maintext text-2xl rotate-180 duration-300 ${!mainNavVisibility && "scale-100"} `}
                    />
                  ) : (
                    <CgClose
                      className={`text-maintext text-2xl hover:text-white duration-300 ${!mainNavVisibility && " scale-100"}`}
                    />
                  )}
                </button>
              </div>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Menu Header */}

            {/* Main Content */}
            <div
              className={`${
                !mainNavVisibility ? " opacity-0 duration-200" : "opacity-100 duration-200 delay-500"
              }  flex flex-col p-4 `}
            >
              {/* Menu Tabs */}
              <MainMenuTabs open={mainNavVisibility} />

              {/* Children Pages */}
              <div className={`${!mainNavVisibility && "opacity-0 duration-200"}`}>{children}</div>
            </div>
            {/* Main Content */}
          </div>
        </div>
      </div>
      {/* DESKTOP MENU */}
    </>
  );
};

export default MainNav;
