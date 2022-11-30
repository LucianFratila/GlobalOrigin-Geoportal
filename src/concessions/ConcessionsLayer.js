import React, { useEffect, useCallback, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import { CgClose } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";

import useStore from "common/utils/stateStore/useStore";

export default function ConcessionsLayer({ map, mapLoaded, layerProps, activateSidePanel }) {

  const hideConcession = useStore((state) => state.hideConcession);
  const [isLoading, setIsLoading] = useState(true);
  const [params,setParams]=useState('')

  const paint = {
      "fill-outline-color": ["case", ["boolean", ["feature-state", "hover"], false],"#000000", "#627BC1"],
      "fill-opacity": ['interpolate',
        ['linear'],
        ['zoom'],
        5,
        1,
        8,
        0],
      "fill-color":"#627BC1",

  };

  const name = "concessions";
  const type = "fill";

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
  },    [layerProps.filters]);

  useEffect(()=>{
    getData()
  },[params])

  let hoveredStateId = null;

  const getData = useCallback(() => {
    setIsLoading(true);
    axios.get(`/concessions/vectors?${params}`).then((response) => {
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
          data:{
                  "type": "FeatureCollection",
                  "features": [
                      { "type": "Feature", "properties": {}, "geometry": null }
                  ]
              }
        });

        map.current.addLayer({
          id: name,
          type: type,
          source: name,
          paint: paint,
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
          popup.setHTML("Id:" + id + "<br>" + "Concession:" + e.features[0].properties.name_geo).addTo(map.current);
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
            "Id:" + e.features[0].properties.Id + "<br>" + "Concession:" + e.features[0].properties.name_geo
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
          <ClipLoader color={paint["fill-color"]} size='20px' />
        ) : (
          <span style={{ backgroundColor: `${paint["fill-color"]}` }} className='w-3 h-3 mr-1'></span>
        )}
        <span className=' mr-5 w-40 text-sm justify-start'>Concessions</span>
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
