import React,{useState} from "react";
import useDebounce from "hooks/useDebounce";
const SearchFilter = ({ disable,getInputData }) => {
    const [val,setVal] = useState(null)
    useDebounce(()=>getInputData(val),1000,[val])
  return (
    <div className="mt-2">
      <form required >
        <div className='relative '>
          <div className='flex absolute text-maintext  inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
              ></path>
            </svg>
          </div>
          <input
            onChange={e=>{setVal(e.target.value)}}
            disabled={disable}
            type='search'
            id='default-search'
            className='block bg-gray-600 placeholder text-maintext p-4 pl-10 rounded-md w-full text-sm'
            placeholder='Search for AAC ID, tree ID...'
            required
          />
          {/* <button
            type='submit'
            disabled={disable}
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
