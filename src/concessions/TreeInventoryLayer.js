import React, { useEffect, useCallback, useState, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios";
import { CgClose } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
import aac_invetory from './data/aac_inventory.json'
import useStore from "common/utils/stateStore/useStore";
import getOpacity from "common/utils/getOpacity";

export default function TreeInventoryLayer({ map, mapLoaded, layerProps, activateSidePanel }) {

  const hideConcession = useStore((state) => state.hideConcession);
  const [isLoading, setIsLoading] = useState(false);
  const [params,setParams]=useState('')
  const [fillOpacity,setFillOpacity]=useState(1)

  const isLoadedRef = useRef(false);

  const paint = {
    "circle-color":["case", ["boolean", ["feature-state", "hover"], false],'rgb(115,18,2)','rgb(215,118,102)']
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
  //  getData()
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
          minzoom:11,
          layout: {
            visibility: layerProps.visibility ? layerProps.visibility : "none",
          },
        });

        map.current.on('zoom', (e) => {
          let zoom = map.current.getZoom()
          
          if(zoom<11)
            setFillOpacity(0)
          else  
            setFillOpacity(1)

          if(!isLoadedRef.current && zoom>11){
            isLoadedRef.current=true;
            getData()
          }
        });
      
        if(!isLoadedRef.current && map.current.getZoom()>11){
          getData();
          isLoadedRef.current=true;
        }

        if( map.current.getZoom()<11)
          setFillOpacity(0)

        map.current.on("mouseenter", name, (e) => {
//          console.log('mouseenter:'+name);
          map.current.getCanvas().style.cursor = "pointer";
        });

        map.current.on("mouseleave", name, () => {
 //         console.log('mouseleave:' + name);
          map.current.getCanvas().style.cursor = "";

          if(popup.isOpen())
            popup.remove();  

          if (hoveredStateId !== null) {
            map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: false });
          }
          hoveredStateId = null;
        });

        map.current.on("mousemove", name, (e) => {
                
//          console.log('mousemove:'+name);
          
          if(!popup.isOpen())
            popup.addTo(map.current);

          if (e.features.length > 0) {
            if (hoveredStateId !== null) {
              map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: false });
            }
            hoveredStateId = e.features[0].id;
            map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: true });
            popup.setHTML("Id:" + e.features[0].properties.treed_id_geo + "<br>" + "Specie:" + e.features[0].properties.species_geo);
            e.popupOnTopLayer = true;
          }
        });

        map.current.on("click", name, clickHandler);
      }
    }
  }, [mapLoaded]);

  const clickHandler=useCallback((e) => {
    if(e.clickOnTopLayer) return;
            e.clickOnTopLayer = true;
            activateSidePanel({'id' : e.features[0].properties.Id ,'species' : e.features[0].properties.species_geo});
  },[])

  useEffect(() => {
    return () => {
      if (map.current.getSource(name)) {
        map.current.removeLayer(name);
        map.current.removeSource(name);
        map.current.off("click", name, clickHandler);
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
          <span style={{ backgroundColor:`rgba(215,118,102,${fillOpacity})`}} className='w-3 h-3 mr-1'></span>
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
