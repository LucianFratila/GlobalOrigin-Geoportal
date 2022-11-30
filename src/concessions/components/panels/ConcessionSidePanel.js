import React from "react";
import useStore from "common/utils/stateStore/useStore";
import TreeBarChart from "./treeBarChart";

////React Icons Imports@spinners//////
import { CgMiniPlayer } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { PulseLoader } from "react-spinners";

///React Query Imports///
import { useQuery } from "react-query";
import { getConcession } from "common/axios/endpoints";
import useTrees from "common/utils/useTrees";

const ConcessionSidePanel = ({ layerData }) => {
  //////////VISIBILITY CONTROLS///////////////
  const concessionSidePanelVisibility = useStore((state) => state.concessionSidePanelVisibility);
  const hideConcessionSidePanel = useStore((state) => state.hideConcessionSidePanel);

  const showMainNav = useStore((state) => state.showMainNav);
  const jwt = useStore((state) => state.jwt);
  //////////VISIBILITY CONTROLS///////////////
  function onClose() {
    hideConcessionSidePanel();
    showMainNav();
  }

  const dataId = layerData?.id;
  const { data: concession } = useQuery(["concession", dataId], () => getConcession(dataId, jwt), {
    // The query will not execute until the condition
    enabled: !!dataId,
  });
  let trees = useTrees();
  let totalTrees = trees?.falled + trees?.live + trees?.marked;
  let species = trees?.species;
  let am = species["African Mahogany"];
  let totalSpecies = am.falled + am.live + am.marked;
  let falledPercentage = ((am.falled * 100) / totalSpecies).toFixed(1);
  let livePercentage = ((am.live * 100) / totalSpecies).toFixed(1);
  let markedPercentage = ((am.marked * 100) / totalSpecies).toFixed(1);

  return (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className=' fixed left-0 top-0 z-50    '>
          <div
            className={`bg-primary/95 overflow-x-hidden h-screen   ${
              concessionSidePanelVisibility ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-0`
            } duration-700`}
          >
            <div className={`grid grid-cols-2 p-4  whitespace-nowrap items-center`}>
              {/* Menu Header */}
              <div
                className={`${
                  !concessionSidePanelVisibility && "opacity-0"
                } flex flex-row gap-2 items-center transition delay-300 duration-400  `}
              >
                <span className='text-maintext'>
                  <CgMiniPlayer size={30} />
                </span>
                <span>
                  <h1 className='text-sm uppercase text-maintext '>Concessions</h1>
                </span>
              </div>
              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button
                  onClick={onClose}
                  className={`${!concessionSidePanelVisibility ? " px-1 py-2  rounded-md" : ""}`}
                >
                  <CgClose
                    className={`text-maintext text-2xl hover:text-white duration-300 ${
                      !concessionSidePanelVisibility && " scale-100"
                    }`}
                  />
                </button>
              </div>
              <span className=' mt-2'>
                <h1 className=' text-lg uppercase text-maintext  '>{concession?.data.data.Name}</h1>
              </span>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Menu Header */}

            {concession ? (
              <>
                {/* Details */}
                <div className='p-4  rounded-md mx-4 bg-neutral-700 text-maintext'>
                  <div className='my-2'>
                    <h1 className=' text-maintext text-lg font-mono'>Details</h1>
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
                </div>
                {/* PAO */}
                <div className='p-4  rounded-md mx-4 mt-4 bg-neutral-700 text-maintext'>
                  <div className='my-2'>
                    <h1 className=' text-maintext text-lg font-mono'>PAO</h1>
                  </div>
                  <div className=' flex flex-row justify-start gap-2 overflow-x-hidden '>
                    <span>
                      <h1 className=' text-sm'>{`Active`}</h1>
                    </span>
                    <span>
                      <h1 className=' text-sm'>{`Expires: ${concession.data.data.CreatedAt}`}</h1>
                    </span>
                  </div>
                </div>
                {/* Trees */}

                <div className='p-4  rounded-md mx-4 mt-4 bg-neutral-700 text-maintext'>
                  <div className='my-2'>
                    <h1 className=' text-maintext text-lg font-mono'>Trees</h1>
                    <p>{totalTrees}</p>
                  </div>
                  <div className=' flex flex-row justify-start gap-2 overflow-x-hidden '>
                    <button className=' bg-slate-600 hover:bg-slate-500 px-8 py-2 rounded-sm text-sm'>
                      Show trees
                    </button>
                  </div>
                  {/* Chart */}
                  <div className=' mt-3'>
                    <div>
                      <span>
                        <h4>Species breakdown in this area</h4>
                      </span>
                      <span className=' flex flex-row gap-3'>
                        <span className=' flex flex-row items-center gap-1'>
                          <span className='bg-[#8a5a40] block w-4 rounded-lg h-4'></span>
                          <p className=' text-maintext text-sm'>{`Falled:(${trees?.falled})`}</p>
                        </span>
                        <span className=' flex flex-row items-center gap-1'>
                          <span className='bg-[#f18f48] block w-4 rounded-lg h-4'></span>
                          <p className=' text-maintext text-sm'>{`Live:(${trees?.live})`}</p>
                        </span>
                        <span className=' flex flex-row items-center gap-1'>
                          <span className='bg-[#27773e] block w-4 rounded-lg h-4'></span>
                          <p className=' text-maintext text-sm'>{`Marked:(${trees?.marked})`}</p>
                        </span>
                      </span>
                    </div>
                    <TreeBarChart
                      name={"African Mahogany"}
                      falledPercentage={falledPercentage}
                      livePercentage={livePercentage}
                      markedPercentage={markedPercentage}
                      colorArray={['#8a5a40','#f18f48','#27773e']}
                    />
                  </div>
                  {/* Chart */}
                </div>
              </>
            ) : (
              <div
                className={`text-maintext absolute h-screen w-full flex items-center justify-center p-5 ${
                  !concessionSidePanelVisibility && " scale-0"
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

export default ConcessionSidePanel;
