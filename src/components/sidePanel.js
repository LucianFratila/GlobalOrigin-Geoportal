
import useStore from "common/utils/stateStore/useStore";


////React Icons Imports//////
import { IoMdArrowDropleft } from "react-icons/io";
import { CgClose } from "react-icons/cg";

const SidePanel = () => {


  //////////VISIBILITY CONTROLS///////////////
  const sidePanel = useStore((state) => state.sidePanel);
  const showSidePanel = useStore((state) => state.showSidePanel);
  const hideSidePanel = useStore((state) => state.hideSidePanel);

  const mainNavVisibility = useStore((state) => state.mainNavVisibility);
  const showMainNav = useStore((state) => state.showMainNav);

  

  //////////VISIBILITY CONTROLS///////////////
function onClose(){
  hideSidePanel()
  // showMainNav()
}

    
  return (
    <>
      {/* DESKTOP MENU */}
      <div>
        <div className=' fixed left-0 top-0 z-50 h-[100%]   '>
          <div
            className={`bg-primary/100 overflow-x-hidden  h-[100%]   ${
              sidePanel ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-0`
            } duration-500`}
          >
            <div className={`grid grid-cols-2  whitespace-nowrap items-center`}>
              {/* Menu Header */}
              <div className={`${!sidePanel && "opacity-0"} transition delay-300 duration-400 p-4 `}>
                <h1 className='text-xl text-maintext '>Layer Name</h1>
                
              </div>
              {/* Menu Header */}

              {/* Menu Close/Open Controls and Search */}
              <div className='flex justify-end p-2'>
                <button
                  onClick={onClose}
                  className={`${!sidePanel ? " px-1 py-2  rounded-md" : ""}`}
                >
                  <CgClose
                      className={`text-maintext text-2xl hover:text-white duration-300 ${!sidePanel && " scale-100"}`}
                    />
                </button>
              </div>
              {/* Menu Close/Open Controls and Search */}
            </div>
            {/* Menu Header */}

            {/* Main Content */}
            
          </div>
        </div>
      </div>
      {/* DESKTOP MENU */}
    </>
  );
};

export default SidePanel;
