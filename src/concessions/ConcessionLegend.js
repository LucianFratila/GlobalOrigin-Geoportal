import { CgClose } from "react-icons/cg";
import useStore from "common/utils/stateStore/useStore";

function MapLegendConcession({ children, data }) {
  const concessionLayerVisibility = useStore((state) => state.concessionLayerVisibility); // asta poti sa o pasezi la layer visible daca vrei
  const concessionLayers = {
    layers: [
      { name: "Concessions", id: 1, color:'red' },
      { name: "UFA's", id: 2, color:'blue' },
      { name: "UFG's", id: 3, color:'green' },
      { name: "AAC's", id: 4, color:'violet' },
    ],
  };
  return (
    <>
      {concessionLayerVisibility && (
        <div style={{ zIndex: 60 }} className='h-auto text-maintext p-4 bg-primary/100 rounded-md fixed right-4 top-20'>
          <span>
            <h1>Active Layers</h1>
            {concessionLayers.layers.map((i) => (
              <span key={i.id} className='flex  items-center justify-between'>
                <span style={ {backgroundColor:`${i.color}`}} className={`w-3 h-3 mr-1`}></span>
                <span className=' mr-5 w-40 text-sm justify-start'>{i.name}</span>
                <button className=' text-maintext hover:text-white'>
                  <CgClose />
                </button>
              </span>
            ))}
          </span>
        </div>
      )}

      {children}
    </>
  );
}

export default MapLegendConcession;
