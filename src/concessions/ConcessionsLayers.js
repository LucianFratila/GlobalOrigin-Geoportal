import React, { useEffect, useCallback } from "react";
import { addVectorLayer, removeVectorLayer } from "map/VectorLayer";
import ConcessionsLayer from "./ConcessionsLayer";
import UFALayer from "./UFALayer";
import UFGLayer from "./UFGLayer";
import AACLayer from "./AACLayer";
import TreeInventoryLayer from "./TreeInventoryLayer";

export default function ConcessionsLayers({ map, mapLoaded, layersProps }) {
  return (
    <>
      <TreeInventoryLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.treeinventory} />
      <AACLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.aac} />
      <UFGLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufg} />
      <UFALayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.ufa} />
      <ConcessionsLayer map={map} mapLoaded={mapLoaded} layerProps={layersProps.concessions} />
    </>
  );
}
