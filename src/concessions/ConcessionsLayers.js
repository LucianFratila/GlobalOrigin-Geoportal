import { useEffect, useCallback } from "react";
import { addVectorLayer, removeVectorLayer } from "map/VectorLayer";
import axios from "axios";

import useStore from "common/utils/stateStore/useStore";

export default function ConcessionsLayers({ map, mapLoaded }) {
  const { changeConcesionLayerData } = useStore();

  const getData = useCallback(() => {
    const bounds = map.current.getBounds();
    axios
      .get(
        `http://hrttrt.zenithmaps.com/marcaje/vectors?bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}&resolution=5`
      )
      .then((response) => {
        changeConcesionLayerData(response.data.name);

        map.current.getSource("marcaje").setData(response.data);
      });
  }, []);

  useEffect(() => {
    if (mapLoaded) {
      addVectorLayer(map.current, "marcaje", "circle", getData);
    }
  }, [mapLoaded]);

  useEffect(() => {
    return () => {
      //alert('unmount marcaje')
      removeVectorLayer(map.current, "marcaje", getData);
    };
  }, []);

  return <div></div>;
}
