const InputSelectConcession = ({ selected, data,returnSelected }) => {  
//  if (data) {
//   data.map(i=>console.log(i.properties.Id))
//  }
  return (
    <select onClick={(e)=>(console.log(e.target.value))} className=' bg-gray-600 text-maintext w-full p-3 rounded-md'>
      <option defaultValue={selected}>{selected}</option>
      {data ? (
        <>
          {data.map((i) => (
            <option className=" bg-primary" key={i.properties.Id} value={i.properties.Id}>{i.properties.name_geo}</option>
          ))}
        </>
      ) : (
        <></>
      )}
    </select>
  );
};

export default InputSelectConcession;
