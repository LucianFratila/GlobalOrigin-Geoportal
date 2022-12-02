// import ReactSlider from 'react-slider'
import { useEffect, useState } from "react";

function MapLegendConcession({ children, layersProps, map, mapLoaded}) {

  const [zoom,setZoom]=useState(7)

  let title=true
  let concessions = layersProps.concessions.visibility
  let aac = layersProps.aac.visibility
  let ufa = layersProps.ufa.visibility
  let ufg = layersProps.ufg.visibility
  if (concessions ==='none'&&aac ==='none'&&ufa ==='none'&&ufg ==='none') {
    title = false
  }  

  useEffect(() => {
    if (mapLoaded) {
      map.current.on('zoom', () => {

          setZoom(map.current.getZoom());

        });
    }
}, [mapLoaded]);

  return (
    <>
      <div style={{ zIndex: 60 }} className='h-auto text-maintext p-4 bg-primary/100 rounded-md fixed right-4 top-20'>
          <span>
            <h1>{title?'Active Layers':'No Active Layers'}</h1>
            {children}
            {/* <ReactSlider
              className="vertical-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              orientation="vertical"
              value={zoom}
              defaultValue={zoom}
              invert={true}
              marks
              withTracks={true}
              step={0.1}
              min={0}
              max={20}
            /> */}
          </span>
          
      </div>
     

    </>
  );
}

export default MapLegendConcession;
