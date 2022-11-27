const InputSelectOptions = ({ selected, data }) => {  
  return (
    <select className=' bg-gray-600 text-maintext w-full p-3 rounded-md'>
      <option defaultValue={selected}>{selected}</option>
      {data ? (
        <>
          {data.map((i) => (
            <option className=" bg-primary" key={i.id} value={`${i.val}`}>{i.val}</option>
          ))}
        </>
      ) : (
        <></>
      )}
    </select>
  );
};

export default InputSelectOptions;
