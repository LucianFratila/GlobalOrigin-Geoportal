import React, {useEffect,useCallback,useState} from 'react'
import axios from "axios"
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { CgClose } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
import useStore from 'common/utils/stateStore/useStore';

export default function UFGLayer({map, mapLoaded, layerProps, activateSidePanel }){
    const hideUFG = useStore((state) => state.hideUFG);
    const [isLoading,setIsLoading]=useState(true)

    const paint={
        "fill-opacity": ['interpolate',['linear'],['zoom'],9, 0.8, 12,0.1],
        "fill-color":["case", ["boolean", ["feature-state", "hover"], false],'rgb(115,18,2)','rgb(215,118,102)'],
        'fill-outline-color':'rgb(115,18,2)',
    }
    const name='ufg'
    const type='fill'
    let hoveredStateId = null;

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "mypopup",
      }).trackPointer();

    const getData = useCallback(
        () => {
            setIsLoading(true)
            const bounds = map.current.getBounds();
            axios.get(`/management_units/vectors`)
                .then(response => {
                    setIsLoading(false)
                    map.current.getSource(name).setData(response.data);
                }) 
        },[]);

    useEffect(()=>{
        if(map.current && map.current.getSource(name))
            map.current.setLayoutProperty(
                name,
                'visibility',
                layerProps.visibility
                );
    },[layerProps.visibility])       
    
    useEffect(()=>{
        if(mapLoaded){
            if(!map.current.getSource(name)){

                map.current.addSource(name, {
                    type: 'geojson',
                    generateId: true,
                    data:{
                            "type": "FeatureCollection",
                            "features": [
                                { "type": "Feature", "properties": {}, "geometry": null }
                            ]
                        }
                });
                   
                map.current.addLayer({
                    'id': name,
                    'type': type,
                    'source': name,
                    'paint': paint,
                    minzoom:9,
                    'layout': {
                        'visibility': layerProps.visibility ?  layerProps.visibility : 'none'
                        },
                }); 

                getData()
    
            
                map.current.on("mouseenter", name, (e) => {
                    console.log('mouseenter:'+name);
                    map.current.getCanvas().style.cursor = "pointer";
                });

                map.current.on("mouseleave", name, () => {
                    console.log('mouseleave:'+name);
                    map.current.getCanvas().style.cursor = "";

                    if(popup.isOpen())
                    popup.remove();  

                    if (hoveredStateId !== null) {
                        map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: false });
                    }
                    hoveredStateId = null;
                });

                map.current.on("mousemove", name, (e) => {
                    console.log('mousemove:'+name);

                    if (e.features.length > 0) {
                        if(e.popupOnTopLayer){
                            popup.remove();
                            return;
                        }

                        if(!popup.isOpen())
                        popup.addTo(map.current);

                        if (hoveredStateId !== null) {
                        map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: false });
                        }
                        hoveredStateId = e.features[0].id;
                        map.current.setFeatureState({ source: name, id: hoveredStateId }, { hover: true });
                        popup.setHTML("Id:" + e.features[0].properties.Id + "<br>" + "UFG:" + e.features[0].properties.name_geo);
                        e.popupOnTopLayer = true;
                    }
                    else{
                        hoveredStateId = null
                    }
                
                });

                map.current.on("click", name, (e) => {
                    if(e.clickOnTopLayer) return;
                    e.clickOnTopLayer = true;
                    
                    console.log('click:'+name);
                    activateSidePanel({ id: e.features[0].properties.Id, UFG: e.features[0].properties});
                  });
            }
        }

    },[mapLoaded])

    useEffect(()=>{

        return () => {
            if(map.current.getSource(name)){
                map.current.removeLayer(name)
                map.current.removeSource(name)
             //   map.current.off('moveend',name,getData)
            }
        }

    },[])


    let block
    if (layerProps.visibility=='visible') {
        block = <span key='1' className='flex items-center justify-between' >
                    {isLoading ? <ClipLoader color='rgba(215,118,102,1)' size="20px"/> : <span style={{ backgroundColor:'rgba(215,118,102,1)'}} className="w-3 h-3 mr-1"></span>}
                    <span className=' mr-5 w-40 text-sm justify-start'>UFG's</span>
                    <button onClick={hideUFG} className=' text-maintext hover:text-white'>
                    <CgClose />
                    </button>
                </span>
      } else {
        block= '' 
      }

    return(
        <React.Fragment>
            {block}
        </React.Fragment>
    )

}