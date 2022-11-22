import React from 'react'
import ConcessionsLayers from './ConcessionsLayers'


export default function ConcessionsPage({ map, mapLoaded}){

   
    return(
        <React.Fragment>
            <div><h5 className="text-muted">CONSESSIONS PAGE</h5></div>
        {/*  <Legend>   de facut legenda  */}
            <ConcessionsLayers map={map} mapLoaded={mapLoaded} ></ConcessionsLayers>
        {/* </Legend> */}
        </React.Fragment>    
    )
}