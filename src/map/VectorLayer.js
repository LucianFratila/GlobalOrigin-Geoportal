import { useEffect } from "react";
import axios from "axios"


export function addVectorLayer(mapCurrent,name,type,getData){

    let paint;
    switch (type) {
        case 'circle':
          paint={
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'red',
                    'circle-stroke-color': 'white'
                }
          break;
        case 'line':
            paint={
                    'line-color': 'red',
                    'line-width': 1,
            }
        break
        default:
        break  
      }

        if(!mapCurrent.getSource(name)){

            mapCurrent.addSource(name, {
                type: 'geojson'
            });
               
            mapCurrent.addLayer({
                'id': name,
                'type': type,
                'source': name,
                'paint': paint
            }); 

            const bounds = mapCurrent.getBounds();
            axios.get(`http://hrttrt.zenithmaps.com/${name}/vectors?bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}&resolution=5`)
                .then(response => {
                    mapCurrent.getSource(name).setData(response.data);
                }) 

            mapCurrent.on('moveend',name, getData);
        }
}


export function removeVectorLayer(mapCurrent,name,getData){
    if(mapCurrent.getSource(name)){
        mapCurrent.removeLayer(name)
        mapCurrent.removeSource(name)
        mapCurrent.off('moveend',name,getData)
    }
}