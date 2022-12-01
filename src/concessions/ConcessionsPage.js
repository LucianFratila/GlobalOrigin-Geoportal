import React, { useState, useEffect } from "react";

import ToggleCheckBox from "components/reusable/toggleCheckbox";
import InputSelectCompany from "./components/inputSelectCompany";
import InputSelectConcession from "./components/inputSelectConcession";

import ConcessionsLayers from "./ConcessionsLayers";
import MapLegendConcession from "./ConcessionLegend";
import ConcessionSidePanel from "concessions/components/panels/ConcessionSidePanel";
import AACSidePanel from "./components/panels/AACSidePanel";
import TreeSidePanel from "./components/panels/treeSidePanel";
import UFGSidePanel from "./components/panels/UFGSidePanel";
import UFASidePanel from "./components/panels/UFASidePanel";
import SearchFilter from "./components/inputSearchFilter";

import useStore from "common/utils/stateStore/useStore";

///React Query Imports///
import { useQuery } from "react-query";
import { getCompanies, getConcessions } from "common/axios/endpoints";

/////
import { FaUndo } from "react-icons/fa";

export default function ConcessionsPage({ map, mapLoaded }) {
  const [layerConcessionData, setLayerConcessionData] = useState(null);
  const [layerAACData, setLayerAACData] = useState(null);
  const [layerTreeData, setLayerTreeData] = useState(null);
  const [layerUFGData, setLayerUFGData] = useState(null);
  const [layerUFAData, setLayerUFAData] = useState(null);

  //////////LAYER VISIBILITY CONTROLS///////////////
  const concessionLayerVisibility = useStore((state) => state.concessionLayerVisibility);
  const toggleConcessionLayer = useStore((state) => state.toggleConcessionLayer);

  const UFAvisibility = useStore((state) => state.UFAvisibility);
  const toggleUFA = useStore((state) => state.toggleUFA);

  const UFGvisibility = useStore((state) => state.UFGvisibility);
  const toggleUFG = useStore((state) => state.toggleUFG);

  const AACvisibility = useStore((state) => state.AACvisibility);
  const toggleAAC = useStore((state) => state.toggleAAC);

  //////////LAYER VISIBILITY CONTROLS///////////////

  //////////////////SIDE PANEL CONTROLS //////////////////

  //show panels
  const showConcessionSidePanel = useStore((state) => state.showConcessionSidePanel);
  const showAACSidePanel = useStore((state) => state.showAACSidePanel);
  const showTreeSidePanel = useStore((state) => state.showTreeSidePanel);
  const showUFGSidePanel = useStore((state) => state.showUFGSidePanel);
  const showUFASidePanel = useStore((state) => state.showUFASidePanel);

  //hide panels
  const hideMainNav = useStore((state) => state.hideMainNav);
  const hideConcessionSidePanel = useStore((state) => state.hideConcessionSidePanel);
  const hideAACSidePanel = useStore((state) => state.hideAACSidePanel);
  const hideTreeSidePanel = useStore((state) => state.hideTreeSidePanel);
  const hideUFGSidePanel = useStore((state) => state.hideUFGSidePanel);
  const hideUFASidePanel = useStore((state) => state.hideUFASidePanel);

  function activateConcessionSidePanel(data) {
    showConcessionSidePanel();
    hideMainNav();

    hideAACSidePanel();
    hideTreeSidePanel();
    hideUFGSidePanel();
    hideUFASidePanel();

    setLayerConcessionData(data);
  }

  function activateAACSidePanel(data) {
    showAACSidePanel();
    hideMainNav();

    hideConcessionSidePanel();
    hideTreeSidePanel();
    hideUFGSidePanel();
    hideUFASidePanel();

    setLayerAACData(data);
  }

  function activateTreeSidePanel(data) {
    showTreeSidePanel();
    hideMainNav();

    hideConcessionSidePanel();
    hideAACSidePanel();
    hideUFGSidePanel();
    hideUFASidePanel();

    setLayerTreeData(data);
  }

  function activateUFGSidePanel(data) {
    showUFGSidePanel();
    hideMainNav();

    hideConcessionSidePanel();
    hideAACSidePanel();
    hideUFASidePanel();
    hideTreeSidePanel();

    setLayerUFGData(data);
  }

  function activateUFASidePanel(data) {
    showUFASidePanel();
    hideMainNav();

    hideConcessionSidePanel();
    hideAACSidePanel();
    hideUFGSidePanel();
    hideTreeSidePanel();

    setLayerUFAData(data);
  }
  //////////////////SIDE PANEL CONTROLS //////////////////

  /////////Fetch /////////////
  const { data: companies, isLoading: companieLoading, error } = useQuery("companies", getCompanies);
  const compdata = companies?.data.data;

  ////lift up state to return selected company//////
  const [companyName, setCompanyName] = useState(null);
  const [concessionName, setConcessionName] = useState(null);
  const [inputSearchValue, setInputSearchValue] = useState(null);

  function selectedCompany(item) {
    console.log(item);
    let parse = `{}`;
    if (item !== "Company Name" && item !== "") {
      parse = `{${item}}`;
    }

    if (parse !== "") {
      return setCompanyName(JSON.parse(parse));
    }
  }

  const compId = companyName?.id;

  const { data: concessionCompId, isLoading: concessionLoading } = useQuery(
    ["concessionCompId", compId],
    () => getConcessions(`?Company=${compId}`),
    {
      // The query will not execute until the condition
      enabled: !!compId,
    }
  );
  const concessdata = concessionCompId?.data.features;
  /**/
  function selectedConcession(item) {
    return setConcessionName(item);
  }
  ////////////////////////////////////
  /////////Fetch /////////////

  let concessionForm = false;
  let searchForm = false;
  companyName === null ? (concessionForm = true) : (concessionForm = false);
  concessionName === null ? (searchForm = true) : (searchForm = false);

  let layersProps = {
    concessions: {
      visibility: `${concessionLayerVisibility ? `visible` : `none`}`,
      filters: {
        Company: `${compId ? compId : ""}`,
      },
    },
    ufa: {
      visibility: `${UFAvisibility ? `visible` : `none`}`,
      filters: {},
    },
    ufg: {
      visibility: `${UFGvisibility ? `visible` : `none`}`,
      filters: {},
    },
    aac: {
      visibility: `${AACvisibility ? `visible` : `none`}`,
      filters: {},
    },
    treeinventory: {
      visibility: `visible`,
      filters: {},
    },
  };

  return (
    <React.Fragment>
      <main className='p-2'>
        {/* layer name & visibility */}
        {/* filters */}
        <section className='  rounded-md p-4 mt-3  bg-neutral-700'>
          <div className=' flex flex-row items-center justify-between'>
            <h1 className=' text-white py-4'>Filters</h1>
            <button
              onClick={() => {
                setConcessionName(null);
                setCompanyName(null);
              }}
              className=' bg-green-600 p-2 text-maintext rounded-full hover:bg-green-700 hover:-rotate-45 duration-300'
            >
              <FaUndo size={15} />
            </button>
          </div>
          <div className='flex flex-row gap-2'>
            {/* Company */}
            <InputSelectCompany
              selected={"Company Name"}
              returnSelected={selectedCompany}
              data={compdata}
              isLoading={companieLoading}
            />
            {/* Concessions */}
            <InputSelectConcession
              disable={concessionForm}
              returnSelected={selectedConcession}
              selected={"Concessions"}
              data={concessdata}
              isLoading={concessionLoading}
            />
          </div>
          <SearchFilter disable={searchForm} getInputData={setInputSearchValue} />
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
      <UFASidePanel layerData={layerUFAData} />
      <UFGSidePanel layerData={layerUFGData} />
      <TreeSidePanel layerData={layerTreeData} />
      <AACSidePanel layerData={layerAACData} />
      <ConcessionSidePanel layerData={layerConcessionData} />
      <MapLegendConcession layersProps={layersProps}>
        <ConcessionsLayers
          map={map}
          mapLoaded={mapLoaded}
          layersProps={layersProps}
          activateConcessionSidePanel={activateConcessionSidePanel}
          activateAACSidePanel={activateAACSidePanel}
          activateTreeSidePanel={activateTreeSidePanel}
          activateUFGSidePanel={activateUFGSidePanel}
          activateUFASidePanel={activateUFASidePanel}
        ></ConcessionsLayers>
      </MapLegendConcession>
    </React.Fragment>
  );
}
