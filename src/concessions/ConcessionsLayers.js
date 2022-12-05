import React, { useEffect, useCallback } from "react";
import { addVectorLayer, removeVectorLayer } from "map/VectorLayer";
import ConcessionsLayer from "./ConcessionsLayer";
import UFALayer from "./UFALayer";
import UFGLayer from "./UFGLayer";
import AACLayer from "./AACLayer";
import TreeInventoryLayer from "./TreeInventoryLayer";

export default function ConcessionsLayers({
  map,
  mapLoaded,
  layersProps,
  activateConcessionSidePanel,
  activateAACSidePanel,
  activateTreeSidePanel,
  activateUFGSidePanel,
  activateUFASidePanel,
}) {
  return (
    <>
    <ConcessionsLayer
        map={map}
        mapLoaded={mapLoaded}
        layerProps={layersProps.concessions}
        activateSidePanel={activateConcessionSidePanel}
      />
      <TreeInventoryLayer
        map={map}
        mapLoaded={mapLoaded}
        layerProps={layersProps.treeinventory}
        activateSidePanel={activateTreeSidePanel}
      />
      

      <AACLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.aac} activateSidePanel={activateAACSidePanel} />
      <UFGLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufg} activateSidePanel={activateUFGSidePanel} />
      <UFALayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufa} activateSidePanel={activateUFASidePanel} />
    </>
  );
}
