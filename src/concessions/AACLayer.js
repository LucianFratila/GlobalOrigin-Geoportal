import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'

import axios from "axios"


export default function AACLayer({map, mapLoaded, layerProps}){

    const paint={
        'fill-color': 'orange'
    }
    const name='aac'
    const type='fill'

    const getData = useCallback(
        () => {
            const bounds = map.current.getBounds();
            axios.get(`/annual_allowable_cuts/vectors`)
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
    
             //   map.current.on('moveend',name, getData);
            }
        }

    },[mapLoaded])

    useEffect(()=>{

        return () => {
            if(map.current.getSource(name)){
                map.current.removeLayer(name)
                map.current.removeSource(name)
              //  map.current.off('moveend',name,getData)
            }
        }

    },[])

    return(
        <React.Fragment>
        </React.Fragment>
    )

}