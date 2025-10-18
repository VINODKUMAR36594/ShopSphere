
import React, { useState } from 'react'
import { HiMagnifyingGlass,HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {
    const [seth,setSeth]=useState("");
const [isOpen,setIsOpen]=useState(false);
const handleSearchTogle =()=>{
    setIsOpen(!isOpen);
}
const handleSearch=(e)=>{
e.preventDefault()
console.log("Form open",seth)
setIsOpen(false)

}
  return (
    <div className={`flex items-center justify-center w-full transtion-all duration-300 ${isOpen? "absolute top-0 left-0 w-full bg-white h-24 z-50":"w-auto"}`}>
    {isOpen ?
    (<form onSubmit={handleSearch} className='relative flex items-center justify-center w-full '>
        <div className='relative w-1/2 flex justify-center'>
        <input type="text" placeholder='Search' value={seth}
        onChange= {(e)=>setSeth(e.target.value)} className='bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700 '></input>
        {/* {Search icon} */}
        <button type="submit" className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800' 
        >
        <HiMagnifyingGlass className='h-6 w-6 '/>
        </button>
        </div>
        
            <button type="button" className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800' onClick={handleSearchTogle}> <HiMiniXMark className='h-6 w-6'/></button>
        
    </form>):(
        <button onClick={handleSearchTogle}>
            <HiMagnifyingGlass className='h-6 w-6' />
        </button>
    )}
    </div>
  )
}

export default SearchBar
