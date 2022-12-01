import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
const UserMenu = ({ user, logout }) => {
  const [open, isOpen] = useState(false);
  return (
    <div>
      <p className='text-xs text-maintext  flex items-center gap-1 '>
        {user}
        <button onClick={() => isOpen((open) => !open)} className=' hover:text-white'>
          <IoMdArrowDropdown size={20} />
        </button>
      </p>
      <div
        id='dropdown'
        className={`${
          open ? "visible" : "hidden"
        }  absolute z-[100] w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700`}
      >
        <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownDefault'>
          <li>
            <Link
              className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
              to='/login'
            >
              Login
            </Link>
          </li>
          <li>
            <a
              href='#'
              onClick={logout}
              className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>

      {/* <div
        className={` bg-neutral-900 text-maintext text-sm flex flex-col p-3 rounded-md w-auto ${
          !open ? " scale-0 " : "scale-100"
        } duration-200 absolute z-[100] `}
      >
        
        <button onClick={logout}>Logout</button>
        <Link to='/login'>Login</Link>
      </div> */}
    </div>
  );
};

export default UserMenu;
