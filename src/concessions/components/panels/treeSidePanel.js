import React, { useState, useEffect } from "react";
import useStore from "common/utils/stateStore/useStore";

////React Icons Imports@spinners//////
import { FaSourcetree } from "react-icons/fa";

import { CgClose } from "react-icons/cg";
import { PulseLoader } from "react-spinners";

///React Query Imports///
import { useQuery } from "react-query";
import { getTreebyParam } from "common/axios/endpoints";

const TreeSidePanel = ({ layerData }) => {
  //////////VISIBILITY CONTROLS///////////////
  const treeSidePanelVisibility = useStore((state) => state.treeSidePanelVisibility);
  const hideTreeSidePanel = useStore((state) => state.hideTreeSidePanel);
  const showMainNav = useStore((state) => state.showMainNav);

  //////////VISIBILITY CONTROLS///////////////
  function onClose() {
    hideTreeSidePanel();
    showMainNav();
  }
  
  const treeID = layerData?.id;

  const { data: tree } = useQuery(["tree", treeID], () => getTreebyParam(`?TreeId=${treeID}`), {
    // The query will not execute until the condition
    enabled: !!treeID,
  });
  
  // const species = tree?.data.features[0].properties.species_geo;
  // const widthAtBase = tree?.data.features[0].properties.diameter_breast_height_geo;
  // const owned = tree?.data.features[0].properties.management_unit_geo;
  // const aac = tree?.data.features[0].properties.aac_geo;
  // const standing = tree?.data.features[0].properties.tree_standing_geo;
  // const marked = tree?.data.features[0].properties.tree_marked_geo;
  const [standing, setStanding] = useState(false);
  const [marked, setMarked] = useState(false);
  const [felled, setFelled] = useState(false);
  const [abattage, setAbattage] = useState(false);
  const [chantier, setChantier] = useState(false);
  // const standing = true;
  // const marked = false;
  // const felled = false;
  // const abattage = true;
  // const chantier = true;
  console.log(layerData);
  const [liveTreeHight, setLiveTreeHight] = useState(0);
  useEffect(() => {
    if (standing) {
      setLiveTreeHight(32);
    }
    if (marked) {
      setLiveTreeHight(36);
    }
    if (felled) {
      setLiveTreeHight(80);
    }
    if (abattage) {
      setLiveTreeHight(121);
    }
    if (chantier) {
      setLiveTreeHight(166);
    }
  }, [standing, marked, felled, abattage, chantier]);

  // console.log(tree?.data.features[0].properties.tree_marked_geo);
  return (
    <>
{/* DESKTOP MENU */}
<div>
        <div className=' fixed left-0 top-0 z-50    '>
          <div
            className={`bg-primary/95 overflow-x-hidden h-screen   ${
              treeSidePanelVisibility ? ` lg:w-[500px] md:w-[500px] sm:w-[500px] xs: w-[500px]  ` : ` w-0`
            } duration-700`}
          >
            <div className={`grid grid-cols-2 p-4  whitespace-nowrap items-center`}>
              {/* Menu Header */}
              <div
                className={`${
                  !treeSidePanelVisibility && "opacity-0"
                } flex flex-row gap-2 items-center transition delay-300 duration-400  `}
              >
                <span className='text-maintext'>
                  <FaSourcetree size={30} />
                </span>
                <span>
                  <h1 className='text-sm uppercase text-maintext '>Tree</h1>
                </span>
              </div>
              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button onClick={onClose} className={`${!treeSidePanelVisibility ? " px-1 py-2  rounded-md" : ""}`}>
                  <CgClose
                    className={`text-maintext text-2xl hover:text-white duration-300 ${
                      !treeSidePanelVisibility && " scale-100"
                    }`}
                  />
                </button>
              </div>
              <span className=' mt-2'>
                <h1 className=' text-lg uppercase text-maintext  '>{treeID}</h1>
              </span>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Menu Header */}

            {tree ? (
              <>
                {/* Details */}
                <div className='p-4  rounded-md mx-4 bg-neutral-700 text-maintext'>
                  <div className='my-2'>
                    <h1 className=' text-maintext text-lg font-mono'>Details</h1>
                  </div>
                  <div className=' flex flex-col text-sm justify-between gap-3 overflow-x-hidden '>
                    <span>
                      <h1>{`Tree type`}</h1>
                      {/* <p className=' underline'>{species}</p> */}
                    </span>
                    <span className='flex flex-row gap-4 items-center'>
                      <h1>{`Width at base`}</h1>
                      {/* <p>{widthAtBase}/cm</p> */}
                    </span>
                    <div className=' flex flex-row justify-between gap-3 overflow-x-hidden '>
                      <span>
                        <h1>{`Owned by`}</h1>
                        {/* <p className=' underline '>{owned}</p> */}
                      </span>
                      <span>
                        <h1>{`AAC`}</h1>
                        {/* <p>{aac}</p> */}
                      </span>
                    </div>
                  </div>
                </div>
                <div className='p-4 mt-3 '>
                  <input onChange={(e) => setLiveTreeHight(e.target.value / 1.01)} type='range' min='1' max='195' />
                  <span className='flex flex-row gap-4'>
                    {/* <button onClick={() => setStanding(!standing)}>standing</button> */}
                    <button onClick={() => setMarked(!marked)}>marked</button>
                    <button onClick={() => setFelled(!felled)}>felled</button>
                    <button onClick={() => setAbattage(!abattage)}>abattage</button>
                    <button onClick={() => setChantier(!chantier)}>chantier</button>
                  </span>
                </div>
                {/* Details */}
                <div className='p-4 mt-3  rounded-md mx-4 bg-neutral-700 text-maintext'>
                  {/* Graph treelife */}

                  <div className={`flex  flex-row ${treeSidePanelVisibility ? "" : " opacity-0 duration-200"}`}>
                    <div>
                      <div className='flex  flex-col'>
                        {/* <span className={`w-7 ml-[1px]border-solid border-b border-sky-100 `}></span> */}
                        <div className={`w-8 h-8  items-center justify-center flex  bg-green-500 rounded-full`}>
                          <FaSourcetree size={20} />
                        </div>
                        <div
                          style={{ height: `${liveTreeHight + 10}px` }}
                          className='border-dashed ml-[15px]   border-l-2 border-sky-500'
                        ></div>
                        <div className={` w-4 h-4 ml-[8px] flex bg-sky-500 rounded-full `}></div>
                      </div>
                    </div>
                    {/* standing, marked, felled, abattage, chantier */}
                    <div className=' flex felx-col  ml-5  w-full '>
                      <div className='flex  flex-col'>
                        <span className={`w-7 -ml-[50px] mt-10 border-solid border-b border-sky-100 `}></span>
                        <span className='-ml-[15px] -mt-9'>{"Live tree"}</span>
                        {liveTreeHight > 34&&marked ? (
                          <>
                            <span className={`w-4 -ml-[37px] mt-[35px] border-solid border-b border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3'>Marked by:XX</span>
                          </>
                        ) : (
                          <>
                            <span className={`w-4 -ml-[37px] mt-[35px] border-solid border-b-0 border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3'></span>
                          </>
                        )}
                        {liveTreeHight > 79&&felled ? (
                          <>
                            <span className={`w-4 -ml-[37px] mt-[30px] border-solid border-b border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3'>Felled</span>
                          </>
                        ) : (
                          <>
                            <span className={`w-4 -ml-[37px] mt-[30px] border-solid border-b-0 border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3'></span>
                          </>
                        )}
                        {liveTreeHight > 120&&abattage ? (
                          <>
                            <span className={`w-7 -ml-[50px] mt-[30px] border-solid border-b border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3 underline'>Carnet d'Abattage</span>
                          </>
                        ) : (
                          <>
                            <span className={`w-4 -ml-[37px] mt-[30px] border-solid border-b-0 border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3 underline'></span>
                          </>
                        )}
                        {liveTreeHight > 163&&chantier ? (
                          <>
                            <span className={`w-7 -ml-[50px] mt-[30px] border-solid border-b border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3 underline'>Carnet de Chantier</span>
                          </>
                        ) : (
                          <>
                            <span className={`w-4 -ml-[37px] mt-[30px] border-solid border-b-0 border-sky-100 `}></span>
                            <span className='-ml-[20px] -mt-3 underline'></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Graph treelife */}
                </div>
              </>
            ) : (
              <div
                className={`text-maintext absolute h-screen w-full flex items-center justify-center p-5 ${
                  !treeSidePanelVisibility && " scale-0"
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

export default TreeSidePanel;





      
