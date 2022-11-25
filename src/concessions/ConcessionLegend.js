

function MapLegendConcession({ children, layersProps}) {
  let title=true
  let concessions = layersProps.concessions.visibility
  let aac = layersProps.aac.visibility
  let ufa = layersProps.ufa.visibility
  let ufg = layersProps.ufg.visibility
  if (concessions ==='none'&&aac ==='none'&&ufa ==='none'&&ufg ==='none') {
    title = false
  }  
  return (
    <>
      <div style={{ zIndex: 60 }} className='h-auto text-maintext p-4 bg-primary/100 rounded-md fixed right-4 top-20'>
          <span>
            <h1>{title?'Active Layers':'No Active Layers'}</h1>
            {children}
          </span>
        </div>


    </>
  );
}

export default MapLegendConcession;
