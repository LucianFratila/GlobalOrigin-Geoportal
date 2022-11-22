
import {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import axios from "axios"

export default function HarvestingPage({map,mapLoaded}){

    const getData = useCallback(
        () => {
            const bounds = map.current.getBounds();
            axios.get(`http://hrttrt.zenithmaps.com/drumuri/vectors?bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}&resolution=5`)
                .then(response => {
                    map.current.getSource('drumuri').setData(response.data);
                }) 
        },[]);

    useEffect(()=>{
        if(mapLoaded){
            addVectorLayer(map.current,'drumuri','line',getData)
        }

    },[mapLoaded])

    useEffect(()=>{
        
        return () => {
            //
            removeVectorLayer(map.current,'drumuri',getData)
        }

    },[])

    return(
        <div><h5 className="text-muted">HARVESTING PAGE</h5></div>
    )
}