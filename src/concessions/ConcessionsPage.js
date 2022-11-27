import React, { useState } from "react";
import axios from "axios";

import ToggleCheckBox from "components/reusable/toggleCheckbox";
import InputSelectOptions from "components/reusable/inputSelectOptions";

import ConcessionsLayers from "./ConcessionsLayers";
import MapLegendConcession from "./ConcessionLegend";
import SidePanel from "components/sidePanel";

import useStore from "common/utils/stateStore/useStore";

///React Query Imports///
import { useQuery } from "react-query";

export default function ConcessionsPage({ map, mapLoaded }) {
  const [layerData, SetLayerData] = useState(null);

  //////////LAYER VISIBILITY CONTROLS///////////////
  const concessionLayerVisibility = useStore((state) => state.concessionLayerVisibility);
  const toggleConcessionLayer = useStore((state) => state.toggleConcessionLayer);

  const UFAvisibility = useStore((state) => state.UFAvisibility);
  const toggleUFA = useStore((state) => state.toggleUFA);

  const UFGvisibility = useStore((state) => state.UFGvisibility);
  const toggleUFG = useStore((state) => state.toggleUFG);

  const AACvisibility = useStore((state) => state.AACvisibility);
  const toggleAAC = useStore((state) => state.toggleAAC);

  const showSidePanel = useStore((state) => state.showSidePanel);
  const hideMainNav = useStore((state) => state.hideMainNav);

  //////////LAYER VISIBILITY CONTROLS///////////////

  function activateSidePanel(data) {
    showSidePanel();
    hideMainNav();
    SetLayerData(data);
  }

  ////MockUp Data////
  const dataSelecteInput = {
    company: [
      { name: "company 1", id: 1 },
      { name: "company 2", id: 2 },
      { name: "company 3", id: 3 },
      { name: "company 4", id: 4 },
      { name: "company 5", id: 5 },
      { name: "company 6", id: 6 },
    ],
    concessions: [
      { name: "concessions 1", id: 1 },
      { name: "concessions 2", id: 2 },
      { name: "concessions 3", id: 3 },
      { name: "concessions 4", id: 4 },
      { name: "concessions 5", id: 5 },
      { name: "concessions 6", id: 6 },
    ],
  };
  ////MockUp Data////

  /////////Fetch Company/////////////
  const fetchData =  () => {
    return axios.get(`https://gabon-dev.globalorigin.org/api/companies/list`);
  };
  const {data:companies, isLoading,error}= useQuery('companies',fetchData)
  const compdata = companies?.data.data
  /////////Fetch Company/////////////



  let layersProps = {
    concessions: {
      visibility: `${concessionLayerVisibility ? `visible` : `none`}`,
      filters:{
                'Company':'CIFHO Moyabi(de ex.)'
      }
    },
    ufa: {
      visibility: `${UFAvisibility ? `visible` : `none`}`,
      filters:{}
    },
    ufg: {
      visibility: `${UFGvisibility ? `visible` : `none`}`,
      filters:{}
    },
    aac: {
      visibility: `${AACvisibility ? `visible` : `none`}`,
      filters:{}
    },
  };

  return (
    <React.Fragment>
      <main className='p-2'>
        {/* layer name & visibility */}
        {/* filters */}
        <section className='  rounded-md p-4 mt-3  bg-neutral-700'>
          <div>
            <h1 className=' text-white py-4'>Filters</h1>
          </div>
          <div className='flex flex-row gap-2'>
            {/* Company */}
            <InputSelectOptions selected={"Company Name"} data={compdata} isLoading={isLoading} />
            {/* Concessions */}
            <InputSelectOptions selected={"Concessions"} data={dataSelecteInput.concessions} />
          </div>
          <div>
            <form>
              <div className='relative py-3'>
                <div className='flex absolute text-maintext  inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                    ></path>
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block bg-gray-600 placeholder text-maintext p-4 pl-10 rounded-md w-full text-sm'
                  placeholder='Search for AAC ID, tree ID...'
                  required
                />
              </div>
            </form>
          </div>
          {/* Layer toggles */}
          <div className=' py-5 gap-3 flex flex-col'>
            <div className='flex py-3 gap-3'>
              <h1 className=' text-white'>View Concessions</h1>
              <ToggleCheckBox
                toggleState={concessionLayerVisibility}
                toggleAction={toggleConcessionLayer}
                name={"Concession Visibility"}
              />
            </div>
          </div>
          <div className=' py-5 gap-3 flex flex-col'>
            <div className='flex py-3 gap-3'>
              <h1 className=' text-white'>View UFA's</h1>
              <ToggleCheckBox toggleState={UFAvisibility} toggleAction={toggleUFA} name={"UFA"} />
            </div>
          </div>
          <div className=' py-5 gap-3 flex flex-col'>
            <div className='flex py-3 gap-3'>
              <h1 className=' text-white'>View UFG's</h1>
              <ToggleCheckBox toggleState={UFGvisibility} toggleAction={toggleUFG} name={"UFG"} />
            </div>
          </div>
          <div className=' py-5 gap-3 flex flex-col'>
            <div className='flex py-3 gap-3'>
              <h1 className=' text-white'>View AAC's</h1>
              <ToggleCheckBox toggleState={AACvisibility} toggleAction={toggleAAC} name={"AAG"} />
            </div>
          </div>
          {/* Layer toggles */}
        </section>
      </main>
      <SidePanel layerData={layerData} title={'Concessions'}  />
      <MapLegendConcession layersProps={layersProps}>
        <ConcessionsLayers
          map={map}
          mapLoaded={mapLoaded}
          layersProps={layersProps}
          activateSidePanel={activateSidePanel}
        ></ConcessionsLayers>
      </MapLegendConcession>
    </React.Fragment>
  );
}
