import { TbMinus } from "react-icons/tb";
import { TbPlus } from "react-icons/tb";
import { AiOutlineSearch } from "react-icons/ai";
import { TiArrowUpThick } from "react-icons/ti";


const MapControls = ({ ZOOM_IN, ZOOM_OUT, ROTATE_NORTH }) => {


  return (
    <>
      <div style={{zIndex:67}} className=' flex fixed   right-[1rem] top-[18rem] '>
        <div className='flex flex-col' role='group'>
          <button
            onClick={()=>{}}
            className={`bg-gray-800 p-1 mb-2  rounded-md hover:bg-gray-600  text-maintext`}
          >
            <AiOutlineSearch size={22} />
          </button>
          <button onClick={ZOOM_IN} className=' bg-gray-800 p-1 rounded-t-md hover:bg-gray-600 text-maintext'>
            <TbPlus size={22} />
          </button>
          <button
            onClick={ZOOM_OUT}
            className=' bg-gray-800 border-t border-b border-gray-200 p-1 hover:bg-gray-600 text-maintext '
          >
            <TbMinus size={22} />
          </button>
          <button onClick={ROTATE_NORTH} className=' bg-gray-800 p-1 rounded-b-md hover:bg-gray-600 text-maintext'>
            <TiArrowUpThick style={{ transform: `rotate(${0}deg)`, transitionDuration: "100ms" }} size={22} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MapControls;
