import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import ConcessionsLayer from './ConcessionsLayer'
import UFALayer from './UFALayer'
import UFGLayer from './UFGLayer'
import AACLayer from './AACLayer'
import TreeInventoryLayer from './TreeInventoryLayer'



export default function ConcessionsLayers({map, mapLoaded, layersProps, activateConcessionSidePanel,activateAACSidePanel}){
    

    return(
        <React.Fragment>
            <TreeInventoryLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.treeinventory} activateSidePanel={()=>{}} />
            <AACLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.aac} activateSidePanel={activateAACSidePanel}/>
            <UFGLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufg} activateSidePanel={()=>{}}/>
            <UFALayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufa} activateSidePanel={()=>{}}/>
            <ConcessionsLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.concessions} activateSidePanel={activateConcessionSidePanel}/>
        </React.Fragment>
    )

}
