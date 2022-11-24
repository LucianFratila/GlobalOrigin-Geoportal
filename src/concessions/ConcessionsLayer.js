import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios"
import { CgController } from 'react-icons/cg';


export default function ConcessionsLayer({map, mapLoaded, layerProps, activateSidePanel}){

    const paint={
        'fill-color': '#627BC1',
        'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hover'], false],
        1,
        0.5
        ]
    }

    
    const name='concessions'
    const type='fill'

    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "mypopup" 
        }).trackPointer();

    const getData = useCallback(
        () => {
            const bounds = map.current.getBounds();
            axios.get(`/concessions/vectors`)
                .then(response => {
                    map.current.getSource(name).setData(response.data);
                }) 
        },[]);

    useEffect(()=>{
        if(map.current)
            map.current.setLayoutProperty(
                name,
                'visibility',
                layerProps.visibility
                );
    },[layerProps.visibility])   

    let hoveredStateId = null;

    useEffect(()=>{
        
        if(mapLoaded){
            if(!map.current.getSource(name)){
               
                map.current.addSource(name, {
                    type: 'geojson',
                    generateId: true // This ensures that all features have unique IDs
                });
                   
                map.current.addLayer({
                    'id': name,
                    'type': type,
                    'source': name,
                    'paint': paint,
                    'layout': {
                        'visibility': layerProps.visibility ?  layerProps.visibility : 'none'
                        },
                }); 

                getData()
    
                map.current.on('mouseenter', name, (e) => {
                    // Change the cursor style as a UI indicator.

                    map.current.getCanvas().style.cursor = 'pointer';
                    const popUps = document.getElementsByClassName('mapboxgl-popup');
                    /** Check if there is already a popup on the map and if so, remove it */
                    if (popUps[0]) popUps[0].remove();   
 
                    const id = e.features[0].properties.Id;
                    popup.setHTML("Id:" + id+'<br>'+  "Concession:" + e.features[0].properties.name_geo ).addTo(map.current)
                               
                });
                        
                map.current.on('mouseleave',name, () => {
                    console.log('mouseleave')
                    map.current.getCanvas().style.cursor = '';
                    popup.remove();
                    if (hoveredStateId !== null) {
                        map.current.setFeatureState(
                        { source: name, id: hoveredStateId },
                        { hover: false }
                        );
                        }
                        hoveredStateId = null;
                }); 
            
                map.current.on('mousemove', name, (e) => {
                    console.log(e)
                    if (e.features.length > 0) {
                    if (hoveredStateId !== null) {
                    map.current.setFeatureState(
                    { source: name, id: hoveredStateId },
                    { hover: false }
                    );
                    }
                    hoveredStateId = e.features[0].id;
                    map.current.setFeatureState(
                    { source: name, id: hoveredStateId },
                    { hover: true }
                    );
                    }
                });

                map.current.on('click', name, (e) => {

                   
                    activateSidePanel({'id':e.features[0].properties.Id,
                                       'concession':e.features[0].properties.name_geo})
                })
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


    return(
        <React.Fragment>
            
        </React.Fragment>
    )

}