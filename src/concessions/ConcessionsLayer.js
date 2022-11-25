import React, { useEffect, useCallback, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import { API_SERVER } from "../config";
import { CgClose } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";

export default function ConcessionsLayer({ map, mapLoaded, layerProps, activateSidePanel }) {
  const [isLoading, setIsLoading] = useState(true);

  const paint = {
    "fill-color": "#627BC1",
    "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 1, 0.5],
  };

  const name = "concessions";
  const type = "fill";

  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "mypopup",
  }).trackPointer();

  useEffect(() => {
    if (map.current) map.current.setLayoutProperty(name, "visibility", layerProps.visibility);
  }, [layerProps.visibility]);

  let hoveredStateId = null;

  const getData = useCallback(() => {
    setIsLoading(true);
    axios.get(`/concessions/vectors`).then((response) => {
      setIsLoading(false);
      map.current.getSource(name).setData(response.data);
    });
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      if (!map.current.getSource(name)) {
        map.current.addSource(name, {
          type: "geojson",
          generateId: true, // This ensures that all features have unique IDs
          //data: API_SERVER + '/concessions/vectors'
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

        /*       map.current.addLayer({
                    "id": "symbols",
                    "type": "symbol",
                    "source": name,
                    "layout": {
                      "symbol-placement": "line-center",
                      "text-font": ["Open Sans Regular"],
                      "text-field": '{Id}',
                      "text-size": 16,
                      "text-rotate": -4,
                      "symbol-spacing": 1,
                    },
                    "paint":{
                      "text-translate":[0,-20],
                    }
                });
           */

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
          <ClipLoader color={paint["fill-color"]} size='20' />
        ) : (
          <span style={{ backgroundColor: `${paint["fill-color"]}` }} className='w-3 h-3 mr-1'></span>
        )}
        <span className=' mr-5 w-40 text-sm justify-start'>Concessions</span>
        <button className=' text-maintext hover:text-white'>
          <CgClose />
        </button>
      </span>
    );
  } else {
    block = "";
  }

  return <React.Fragment>{block}</React.Fragment>;
}
