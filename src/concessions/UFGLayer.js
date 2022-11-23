import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'

import axios from "axios"


export default function UFGLayer({map, mapLoaded, layerProps}){

    const paint={
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-color': 'blue',
        'circle-stroke-color': 'white'
    }
    const name='ufg'
    const type='circle'

    const getData = useCallback(
        () => {
            const bounds = map.current.getBounds();
            axios.get(`http://hrttrt.zenithmaps.com/marcaje/vectors?bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}&resolution=5`)
                .then(response => {
                    map.current.getSource(name).setData(response.data);
                }) 
        },[]);

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
                        // Make the layer visible by default.
                        'visibility': layerProps.visibility
                        },
                }); 

                getData()
    
                map.current.on('moveend',name, getData);
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