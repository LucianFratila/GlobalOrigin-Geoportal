import React, { useState, useEffect } from "react";
import useStore from "common/utils/stateStore/useStore";


////React Icons Imports@spinners//////
import { CgMiniPlayer } from "react-icons/cg";

import { CgClose } from "react-icons/cg";
import { PulseLoader } from "react-spinners";

///React Query Imports///
// import { useQuery } from "react-query";
// import { getAACbyParam } from "common/axios/endpoints";

const UFGSidePanel = ({ layerData }) => {
  //////////VISIBILITY CONTROLS///////////////
  const UGFSidePanelVisibility = useStore((state) => state.UGFSidePanelVisibility);
  const hideUFGSidePanel = useStore((state) => state.hideUFGSidePanel);
  const showMainNav = useStore((state) => state.showMainNav);



  //////////VISIBILITY CONTROLS///////////////
  function onClose() {
    hideUFGSidePanel();
    showMainNav();
  }
  const name = layerData?.name
  // console.log(layerData);
  
 
  return (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className=' fixed left-0 top-0 z-50    '>
          <div
            className={`bg-primary/95 overflow-x-hidden h-screen   ${
              UGFSidePanelVisibility ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-0`
            } duration-700`}
          >
            <div className={`grid grid-cols-2 p-4  whitespace-nowrap items-center`}>
              {/* Menu Header */}
              <div
                className={`${
                  !UGFSidePanelVisibility && "opacity-0"
                } flex flex-row gap-2 items-center transition delay-300 duration-400  `}
              >
                <span className='text-maintext'>
                <CgMiniPlayer size={30} />
                </span>
                <span>
                  <h1 className='text-sm uppercase text-maintext '>UFG</h1>
                </span>
              </div>
              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button onClick={onClose} className={`${!UGFSidePanelVisibility ? " px-1 py-2  rounded-md" : ""}`}>
                  <CgClose
                    className={`text-maintext text-2xl hover:text-white duration-300 ${
                      !UGFSidePanelVisibility && " scale-100"
                    }`}
                  />
                </button>
              </div>
              <span className=' mt-2'>
                <h1 className=' text-lg uppercase text-maintext  '>{name}</h1>
              </span>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Menu Header */}

            {true ? (
              <>
                {/* Details */}
                <div className='p-4  rounded-md mx-4 bg-neutral-700 text-maintext'>
                  <div className='my-2'>
                    <h1 className=' text-maintext text-lg font-mono'>Details</h1>
                  </div>
                  <div className=' flex flex-row justify-between overflow-x-hidden '>
                    <span>
                      <h1 className=' text-sm'>{`Type:`}</h1>
                      {/* <p className=' underline'>{species}</p> */}
                    </span>
                    <span>
                      <h1 className=' text-sm'>{`CreatedAt:`}</h1>
                      {/* <p>{aac.data.data.CreatedAt}</p> */}
                    </span>
                  </div>
                </div>
                {/* PAO */}
              </>
            ) : (
              <div
                className={`text-maintext absolute h-screen w-full flex items-center justify-center p-5 ${
                  !UGFSidePanelVisibility && " scale-0"
                }`}
              >
                <PulseLoader color='#02690b' size={30} />
              </div>
            )}

            {/* Main Content */}
          </div>
        </div>
      </div>
      {/* DESKTOP MENU */}
    </>
  );
};

export default UFGSidePanel;
