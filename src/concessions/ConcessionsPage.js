import React from 'react'
import ConcessionsLayers from './ConcessionsLayers'


export default function ConcessionsPage({ map, mapLoaded}){
    
    let layersProps={
        'concessions':{
            'visibility':'visible'
        },
        'ufa':{
            'visibility':'none'
        },
        'ufg':{
            'visibility':'none'
        },
        'aac':{
            'visibility':'visible'
        }
    }
   
    return(
        <React.Fragment>
            <div><h5 className="text-muted">CONSESSIONS PAGE</h5></div>
        {/*  <Legend>   de facut legenda  */}
            <ConcessionsLayers map={map} mapLoaded={mapLoaded} layersProps={layersProps} ></ConcessionsLayers>
        {/* </Legend> */}
        </React.Fragment>    
    )
}