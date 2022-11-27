import React, {useEffect,useCallback,useState} from 'react'
import axios from "axios"
import { CgClose } from "react-icons/cg";
import ClipLoader from "react-spinners/ClipLoader";
import useStore from 'common/utils/stateStore/useStore';

export default function UFGLayer({map, mapLoaded, layerProps}){
    const hideUFG = useStore((state) => state.hideUFG);
    const [isLoading,setIsLoading]=useState(true)

    const paint={
        'fill-color': 'blue'
    }
    const name='ufg'
    const type='fill'

    const getData = useCallback(
        () => {
            setIsLoading(true)
            const bounds = map.current.getBounds();
            axios.get(`/management_units/vectors`)
                .then(response => {
                    setIsLoading(false)
                    map.current.getSource(name).setData(response.data);
                }) 
        },[]);

    useEffect(()=>{
        if(map.current)
            map.current.setLayoutProperty(
                name,
                'visibility',
                layerProps.visibility
                );
    },[layerProps.visibility])       
    
    useEffect(()=>{
        if(mapLoaded){
            if(!map.current.getSource(name)){

                map.current.addSource(name, {
                    type: 'geojson'
                });
                   
                map.current.addLayer({
                    'id': name,
                    'type': type,
                    'source': name,
                    'paint': paint,
                    'layout': {
                        'visibility': layerProps.visibility ?  layerProps.visibility : 'none'
                        },
                }); 

                getData()
    
             //   map.current.on('moveend',name, getData);

            }
        }

    },[mapLoaded])

    useEffect(()=>{

        return () => {
            if(map.current.getSource(name)){
                map.current.removeLayer(name)
                map.current.removeSource(name)
             //   map.current.off('moveend',name,getData)
            }
        }

    },[])


    let block
    if (layerProps.visibility=='visible') {
        block = <span key='1' className='flex items-center justify-between' >
                    {isLoading ? <ClipLoader color={paint["fill-color"]} size="20"/> : <span style={{backgroundColor:`${paint["fill-color"]}`}} className="w-3 h-3 mr-1"></span>}
                    <span className=' mr-5 w-40 text-sm justify-start'>UFG's</span>
                    <button onClick={hideUFG} className=' text-maintext hover:text-white'>
                    <CgClose />
                    </button>
                </span>
      } else {
        block= '' 
      }

    return(
        <React.Fragment>
            {block}
        </React.Fragment>
    )

}