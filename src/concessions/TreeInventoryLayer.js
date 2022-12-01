import React, { useEffect, useCallback, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import { CgClose } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
import aac_invetory from './data/aac_inventory.json'
import useStore from "common/utils/stateStore/useStore";

export default function TreeInventoryLayer({ map, mapLoaded, layerProps, activateSidePanel }) {

  const hideConcession = useStore((state) => state.hideConcession);
  const [isLoading, setIsLoading] = useState(true);
  const [params,setParams]=useState('')

  const paint = {
    "circle-color":"#ff0000"
  };

  const name = "treeinventory";
  const type = "circle";

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "mypopup",
  }).trackPointer();

  useEffect(() => {
    if (map.current && map.current.getSource(name)) map.current.setLayoutProperty(name, "visibility", layerProps.visibility);
  }, [layerProps.visibility]);

  useEffect(() => {
    if(layerProps.filters.Company){
      setParams(`Company=${layerProps.filters.Company}`)
    }
  }, [layerProps.filters]);

  useEffect(()=>{
    getData()
  },[params])

  let hoveredStateId = null;

  const getData = useCallback(() => {
    setIsLoading(true);
    axios.get(`/annual_allowable_cut_inventory/vectors?${params}`).then((response) => {
      setIsLoading(false);
      map.current.getSource(name).setData(response.data);
    });
  }, [params]);

  useEffect(() => {
    if (mapLoaded) {
      if (!map.current.getSource(name)) {
        map.current.addSource(name, {
          type: "geojson",
          generateId: true,
          data:{aac_invetory}
        });

        map.current.addLayer({
          id: name,
          type: type,
          source: name,
          paint: paint,
          minzoom:10,
          layout: {
            visibility: layerProps.visibility ? layerProps.visibility : "none",
          },
        });

        getData();

        map.current.on("mouseenter", name, (e) => {
          map.current.getCanvas().style.cursor = "pointer";
          const popUps = document.getElementsByClassName("mapboxgl-popup");
          if (popUps[0]) popUps[0].remove();

          const id = e.features[0].properties.Id;
          popup.setHTML("Id:" + id + "<br>" + "Specie:" + e.features[0].properties.species_geo).addTo(map.current);
        });

        map.current.on("mouseleave", name, () => {
          map.current.getCanvas().style.cursor = "";
          popup.remove();
          if (hoveredStateId !== null) {
            map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = null;
        });

        map.current.on("mousemove", name, (e) => {
          popup.setHTML(
            "Id:" + e.features[0].properties.Id + "<br>" + "Specie:" + e.features[0].properties.species_geo
          );

          if (e.features.length > 0) {
            if (hoveredStateId !== null) {
              map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: false });
            }
            hoveredStateId = e.features[0].id;
            map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: true });
          }
        });

        map.current.on("click", name, (e) => {
          activateSidePanel({ id: e.features[0].properties.Id, concession: e.features[0].properties.name_geo });
        });
      }
    }
  }, [mapLoaded]);

  useEffect(() => {
    return () => {
      if (map.current.getSource(name)) {
        map.current.removeLayer(name);
        map.current.removeSource(name);
        
      }
    };
  }, []);

  let block;
  if (layerProps.visibility == "visible") {
    block = (
      <span key='1' className='flex items-center justify-between'>
        {isLoading ? (
          <ClipLoader color={paint["circle-color"]} size='20px' />
        ) : (
          <span style={{ backgroundColor: `${paint["circle-color"]}` }} className='w-3 h-3 mr-1'></span>
        )}
        <span className=' mr-5 w-40 text-sm justify-start'>Tree inventory</span>
        <button onClick={hideConcession} className=' text-maintext hover:text-white'>
          <CgClose />
        </button>
      </span>
    );
  } else {
    block = "";
  }

  return <React.Fragment>{block}</React.Fragment>;
}
