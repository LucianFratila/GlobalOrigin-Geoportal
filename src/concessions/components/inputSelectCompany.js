const InputSelectCompany = ({ selected, data,returnSelected }) => {  
  
  return (
    <select onClick={(e)=>returnSelected(e.target.value)} className=' bg-gray-600 text-maintext w-full p-3 rounded-md'>
      <option  defaultValue={selected}>{selected}</option>
      {data ? (
        <>
          {data.map((i) => (
            <option className=" bg-primary" key={i.id} value={`"val":"${i.val}" , "id":${i.id}`}>{i.val}</option>
          ))}
        </>
      ) : (
        <></>
      )}
    </select>
  );
};

export default InputSelectCompany;
