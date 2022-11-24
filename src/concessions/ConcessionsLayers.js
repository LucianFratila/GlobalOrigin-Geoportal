import React, {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import ConcessionsLayer from './ConcessionsLayer'
import UFALayer from './UFALayer'
import UFGLayer from './UFGLayer'
import AACLayer from './AACLayer'
import axios from "axios"


export default function ConcessionsLayers({map, mapLoaded, layersProps, activateSidePanel}){
    

    return(
        <React.Fragment>
            <ConcessionsLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.concessions} activateSidePanel={activateSidePanel}/>
            <UFALayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufa} activateSidePanel={activateSidePanel}/>
            <UFGLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufg} activateSidePanel={activateSidePanel}/>
            <AACLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.aac} activateSidePanel={activateSidePanel}/>
        </React.Fragment>
    )

}
