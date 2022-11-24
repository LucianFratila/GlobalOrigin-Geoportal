import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import axios from "axios"


export default function ConcessionsLayer({map, mapLoaded, layerProps}){

    const paint={
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-color': 'red',
        'circle-stroke-color': 'white'
    }
    const name='concessions'
    const type='circle'
    
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
        });

    const getData = useCallback(
        () => {
            const bounds = map.current.getBounds();
            axios.get(`http://hrttrt.zenithmaps.com/marcaje/vectors?bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}&resolution=5`)
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

    useEffect(()=>{
        
        if(mapLoaded){
            if(!map.current.getSource(name)){
               
                map.current.addSource(name, {
                    type: 'geojson'
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
    
                map.current.on('moveend',name, getData);

                map.current.on('mouseenter', name, (e) => {
                    // Change the cursor style as a UI indicator.
                    map.current.getCanvas().style.cursor = 'pointer';
                    const popUps = document.getElementsByClassName('mapboxgl-popup');
                    /** Check if there is already a popup on the map and if so, remove it */
                    if (popUps[0]) popUps[0].remove();   
                    // Copy coordinates array.
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const id = e.features[0].properties.id;
                        
                    // Ensure that if the map is zoomed out such that multiple
                    // copies of the feature are visible, the popup appears
                    // over the copy being pointed to.
                    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                    }
                        
                    // Populate the popup and set its coordinates
                    // based on the feature found.
                    popup.setLngLat(coordinates).setHTML(id).addTo(map.current);
                });
                        
                map.current.on('mouseleave',name, () => {
                    map.current.getCanvas().style.cursor = '';
                    popup.remove();
                });    
            }
        }

    },[mapLoaded])

    useEffect(()=>{

        return () => {
            if(map.current.getSource(name)){
                map.current.removeLayer(name)
                map.current.removeSource(name)
                map.current.off('moveend',name,getData)
            }
        }

    },[])


    return(
        <React.Fragment>
            
        </React.Fragment>
    )

}