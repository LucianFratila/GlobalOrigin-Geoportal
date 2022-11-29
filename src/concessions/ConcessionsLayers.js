import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import ConcessionsLayer from './ConcessionsLayer'
import UFALayer from './UFALayer'
import UFGLayer from './UFGLayer'
import AACLayer from './AACLayer'
import TreeInventoryLayer from './TreeInventoryLayer'



export default function ConcessionsLayers({map, mapLoaded, layersProps, activateSidePanel}){
    

    return(
        <React.Fragment>
            <TreeInventoryLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.treeinventory} activateSidePanel={activateSidePanel}/>
            <AACLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.aac} activateSidePanel={activateSidePanel}/>
            <UFGLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufg} activateSidePanel={activateSidePanel}/>
            <UFALayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufa} activateSidePanel={activateSidePanel}/>
            <ConcessionsLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.concessions} activateSidePanel={activateSidePanel}/>
        </React.Fragment>
    )

}
