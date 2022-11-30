import React,{useEffect} from "react";
import useStore from "common/utils/stateStore/useStore";
////React Icons Imports@spinners//////
import { CgMiniPlayer } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { PulseLoader } from "react-spinners";

///React Query Imports///
import { useQuery } from "react-query";
import { getConcession } from "common/axios/endpoints";
import useTrees from 'common/utils/useTrees'

const SidePanel = ({ layerData, title }) => {
  //////////VISIBILITY CONTROLS///////////////
  const sidePanel = useStore((state) => state.sidePanel);
  const hideSidePanel = useStore((state) => state.hideSidePanel);
  
  const showMainNav = useStore((state) => state.showMainNav);
  const jwt = useStore((state) => state.jwt);
  //////////VISIBILITY CONTROLS///////////////
  function onClose() {
    hideSidePanel();
    showMainNav();
  } 
  
  const dataId = layerData?.id
  const {data:concession, isLoading,error}= useQuery(['concession',dataId],()=>getConcession(dataId,jwt),{
    // The query will not execute until the condition
    enabled: !!dataId,
  })


  let trees= JSON.stringify(useTrees())

  
  
  return (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className=' fixed left-0 top-0 z-50    '>
          <div
            className={`bg-primary/95 overflow-x-hidden h-screen   ${
              sidePanel ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-0`
            } duration-700`}
          >
            <div className={`grid grid-cols-2  whitespace-nowrap items-center`}>
              {/* Menu Header */}
              <div
                className={`${
                  !sidePanel && "opacity-0"
                } flex flex-row gap-2 items-center transition delay-300 duration-400 p-4 `}
              >
                <span className='text-maintext'>
                  <CgMiniPlayer size={30} />
                </span>
                <span>
                  <h1 className='text-sm uppercase text-maintext '>{title}</h1>
                </span>
              </div>
              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button onClick={onClose} className={`${!sidePanel ? " px-1 py-2  rounded-md" : ""}`}>
                  <CgClose
                    className={`text-maintext text-2xl hover:text-white duration-300 ${!sidePanel && " scale-100"}`}
                  />
                </button>
              </div>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Entity Name */}
            <div className='px-4 my-3'>
              <span>{/* <h1 className=' text-maintext text-2xl'>{data.concession}</h1> */}</span>
            </div>
            {/* Menu Header */}

            {concession ? (
              <>
                <div className='p-4  rounded-md mx-4 bg-neutral-700 text-maintext'>
                  <div className='my-2'>
                    <h1 className=' text-maintext font-mono'>Details</h1>
                  </div>
                  <div className=' flex flex-row justify-between overflow-x-hidden '>
                    <span>
                      <h1 className=' text-sm'>{`Company(s) involved:`}</h1>
                      <p className=' underline'>{concession.data.data.Name}</p>
                    </span>
                    <span>
                      <h1 className=' text-sm'>{`CreatedAt:`}</h1>
                      <p>{concession.data.data.CreatedAt}</p>
                    </span>
                  </div>
                  {trees}
                  {/* <p>Continent: {value.Continent}</p>
                  <p>CreatedAt: {value.CreatedAt}</p>
                  <p>UpdatedAt: {value.UpdatedAt}</p>
                  <p>User: {value.User}</p>
                  <p>ProductType: {value.ProductType}</p> */}
                </div>
              </>
            ) : (
              <div
                className={`text-maintext absolute h-screen w-full flex items-center justify-center p-5 ${
                  !sidePanel && " scale-0"
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

export default SidePanel;
