const TreeBarChart = ({name,falledPercentage,livePercentage,markedPercentage, colorArray}) => {
  return (
    <div className=' mt-3'>
      
      <div className=' mt-8'>
        <p>{name}</p>
        <div className='flex flex-row  '>
          <span style={{ width: `${falledPercentage}%`, backgroundColor:`${colorArray[0]}` }} className={`h-3 rounded-l-xl`}></span>
          <span style={{ width: `${livePercentage}%`, backgroundColor:`${colorArray[1]}` }} className={`h-3  bg-green-500 `}></span>
          <span style={{ width: `${markedPercentage}%`,backgroundColor:`${colorArray[2]}`  }} className={`h-3 rounded-r-xl bg-blue-500 `}></span>
        </div>
        <div className='flex flex-row  '>
          <span style={{ width: `${falledPercentage}%` }} className={`h-3`}>
            {falledPercentage > 10 ? <p className=' text-maintext text-right text-sm'>{`${falledPercentage}%`}</p> : ""}
          </span>
          <span style={{ width: `${livePercentage}%` }} className={`h-3`}>
            {livePercentage > 10 ? <p className=' text-maintext text-right text-sm'>{`${livePercentage}%`}</p> : ""}
          </span>
          <span style={{ width: `${markedPercentage}%` }} className={`h-3`}>
            {markedPercentage > 10 ? <p className=' text-maintext text-right text-sm'>{`${markedPercentage}%`}</p> : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TreeBarChart;
