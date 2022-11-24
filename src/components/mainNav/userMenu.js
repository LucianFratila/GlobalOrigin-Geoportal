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
        className={` bg-neutral-900 text-maintext text-sm flex flex-col p-3 rounded-md w-auto ${
          !open ? " scale-0 " : "scale-100"
        } duration-200 absolute z-[100] `}
      >
        <button onClick={logout}>Logout</button>
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
};

export default UserMenu;
