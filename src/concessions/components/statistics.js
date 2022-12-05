import React, { useState, useEffect } from "react";

import { PieChart } from "react-minimal-pie-chart";
import useStore from "common/utils/stateStore/useStore";
import { SlArrowUp } from "react-icons/sl";

const ConcessionsStatistics = ({ data }) => {
  const mainNavVisibility = useStore((state) => state.mainNavVisibility);
  const [open, isOpen] = useState(false);

  useEffect(() => {
    if (!mainNavVisibility) {
      isOpen(false);
    }
  }, [mainNavVisibility]);
  return (
    <section
      className={`flex flex-col overflow-hidden p-4 mt-4 mb-6 rounded-md bg-neutral-700 ${
        open ? " h-[100%] duration-300" : " h-auto   duration-300"
      } `}
    >
      <div className=' flex flex-row justify-between items-center'>
        <div>
          <h1 className=' text-maintext font-mono'>Statistics</h1>
        </div>
        <div className='text-maintext  '>
          <button
            onClick={() => {
              isOpen(!open);
            }}
            className=' rounded-full hover:bg-gray-600 p-2'
          >
            <SlArrowUp className={`${open ? "rotate-180 duration-200" : " rotate-0 duration-200"}`} size={20} />
          </button>
        </div>{" "}
      </div>
      {open ? (
        <>
          <div
            className={`flex flex-row gap-3 mt-3   bg-neutral-600 rounded-md p-4 ${
              open ? " opacity-100 duration-200" : "opacity-0 duration-200"
            }  `}
          >
            {/* ITEM CHART */}
            <div className=' w-40'>
              <PieChart startAngle={0} lengthAngle={360} lineWidth={30} animate={true} data={data} />
            </div>
            <div className='grid grid-cols-2 lg:grid-cols-2'>
              {data.map((i) => (
                <span className='flex ' key={i.title}>
                  <span className=' flex flex-row gap-1 justify-center items-center mx-1'>
                    <p className=' text-xs text-maintext'>{`${i.value}%`}</p>
                    <span
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: `${i.color}`,
                        borderRadius: "50%",
                        display: "inline-block",
                        padding: "5px",
                      }}
                    ></span>
                    <p className=' text-xs text-maintext'>{i.title}</p>
                  </span>
                </span>
              ))}
            </div>
            {/* ITEM CHART */}
          </div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default ConcessionsStatistics;
