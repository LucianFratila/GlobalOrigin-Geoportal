import useStore from "common/utils/stateStore/useStore";

function MapLegendConcession({ children, data }) {
  const concessionLayerVisibility = useStore((state) => state.concessionLayerVisibility);// asta poti sa o pasezi la layer visible daca vrei

  return (
    <>
      {concessionLayerVisibility && (
        <div
          style={{ zIndex: 60 }}
          className=' w-56 h-auto text-maintext p-4 bg-primary/100 rounded-md fixed right-4 top-20'
        >
          <span>
            <h1>{`Active Layers`}</h1>
            <p>Concession Layer: {data ? `${data}` : `loading`}</p>
          </span>
        </div>
      )}

      {children}
    </>
  );
}

export default MapLegendConcession;
