
import {useEffect,useCallback} from 'react'
import {addVectorLayer,removeVectorLayer} from 'map/VectorLayer'
import axios from "axios"

export default function ConcessionsPage({map,mapLoaded}){


    const getData = useCallback(
        () => {
            const bounds = map.current.getBounds();
            axios.get(`http://hrttrt.zenithmaps.com/marcaje/vectors?bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}&resolution=5`)
                .then(response => {
                    map.current.getSource('marcaje').setData(response.data);
                }) 
        },[]);

    useEffect(()=>{
        if(mapLoaded){
            addVectorLayer(map.current,'marcaje','circle',getData)
        }

    },[mapLoaded])

    useEffect(()=>{

        return () => {
            //alert('unmount marcaje')
            removeVectorLayer(map.current,'marcaje',getData)
        }

    },[])

    return(
        <div><h5 className="text-muted">CONSESSIONS PAGE</h5></div>
        // <ConcessionMap map={map}></ConcessionMap>
    )
}