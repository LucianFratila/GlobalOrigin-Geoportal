import { CgClose } from "react-icons/cg";
import useStore from "common/utils/stateStore/useStore";

function MapLegendConcession({ children}) {

  return (
    <>
      <div style={{ zIndex: 60 }} className='h-auto text-maintext p-4 bg-primary/100 rounded-md fixed right-4 top-20'>
          <span>
            <h1>Active Layers</h1>
            {children}
          </span>
        </div>


    </>
  );
}

export default MapLegendConcession;
