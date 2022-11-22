import React from 'react'
import HarvestingLayers from './HarvestingLayers'


export default function HarvestingLayers({map, mapLoaded}){

    return(
        <React.Fragment>
            <div><h5 className="text-muted">Harvesting PAGE</h5></div>
        {/*  <Legend>   de facut legenda  */}
            <HarvestingLayers map={map} mapLoaded={mapLoaded} ></HarvestingLayers>
        {/* </Legend> */}
        </React.Fragment>    
    )
}