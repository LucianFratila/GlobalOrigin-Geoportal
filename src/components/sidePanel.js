import React, { useEffect, useState } from "react";
import useStore from "common/utils/stateStore/useStore";
import axios from "axios";
////React Icons Imports//////
import { IoMdArrowDropleft } from "react-icons/io";
import { CgClose } from "react-icons/cg";

const SidePanel = ({ data }) => {
  //////////VISIBILITY CONTROLS///////////////
  const sidePanel = useStore((state) => state.sidePanel);
  const hideSidePanel = useStore((state) => state.hideSidePanel);
  const showMainNav = useStore((state) => state.showMainNav);
  const [value, setValue] = useState(null);
  const jwt = useStore((state) => state.jwt);
  //////////VISIBILITY CONTROLS///////////////

  function onClose() {
    hideSidePanel();
    showMainNav();
  }

  async function getData(id) {
    try {
      const res = await axios.get(`https://gabon-dev.globalorigin.org/api/concessions/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setValue(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setValue(null);
  }, [data]);

  useEffect(() => {
    let mount = true;
    if (mount) {
      if (data && jwt) {
        getData(data.id);
      }
    }
    return () => (mount = false);
  }, [data, jwt]);

  if (data) {
    return (
      <>
        {/* DESKTOP MENU */}
        <div>
          <div className=' fixed left-0 top-0 z-50    '>
            <div
              className={`bg-primary/100 overflow-x-hidden h-screen   ${
                sidePanel ? ` lg:w-[500px] md:w-[500px] sm:w-[300px] xs: w-[300px]  ` : ` w-0`
              } duration-700`}
            >
              <div className={`grid grid-cols-2  whitespace-nowrap items-center`}>
                {/* Menu Header */}
                <div className={`${!sidePanel && "opacity-0"} transition delay-300 duration-400 p-4 `}>
                  <h1 className='text-xl text-maintext '>{data.concession}</h1>
                </div>
                {/* Menu Header */}

                {/* Menu Close/Open Controls and Search */}
                <div className='flex justify-end p-2'>
                  <button onClick={onClose} className={`${!sidePanel ? " px-1 py-2  rounded-md" : ""}`}>
                    <CgClose
                      className={`text-maintext text-2xl hover:text-white duration-300 ${!sidePanel && " scale-100"}`}
                    />
                  </button>
                </div>
                {/* Menu Close/Open Controls and Search */}
              </div>
              {/* Menu Header */}

              {value ? (
                <>
                  <div className='p-4 text-maintext'>
                    <p>Continent: {value.Continent}</p>
                    <p>CreatedAt: {value.CreatedAt}</p>
                    <p>UpdatedAt: {value.UpdatedAt}</p>
                    <p>User: {value.User}</p>
                    <p>ProductType: {value.ProductType}</p>
                  </div>
                </>
              ) : (
                <div className=' text-maintext flex justify-center'>
                  <div role='status'>
                    <svg
                      aria-hidden='true'
                      className='mr-2  w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-600'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='currentColor'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentFill'
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Main Content */}
            </div>
          </div>
        </div>
        {/* DESKTOP MENU */}
      </>
    );
  } else {
    return <></>;
  }
};

export default SidePanel;
