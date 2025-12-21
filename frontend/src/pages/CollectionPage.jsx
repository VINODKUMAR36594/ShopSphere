import React,{useEffect,useRef,useState} from 'react'
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSlidebar'
const CollectionPage = () => {
    const [products,setProducts]=useState([]);
    const sidebarRef=useRef(null);
    const [isSidebarOpen,setIsSidebarOpen]=useState(false);

    const toggleSideBar=()=>{
        setIsSidebarOpen(!isSidebarOpen);
    }
    // const handleClickOutside=(e)=>{
    //     if(isSidebarRef.current && !sidebarRef.current.contains(e.target)) {

    //     }
    // }
    useEffect(()=>{
        //add event listenr for class
        document.addEventListener("mousedown",handleClickOutside);
    })
    useEffect(()=>{
        setTimeout(()=>{
            const fetchProducts=[
                 {
        _id:1,
        name:"product 1",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=1"
        }],


    },
    {
        _id:2,
        name:"product 2",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=2"
        }],


    },
    {
        _id:3,
        name:"product 3",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=3"
        }],


    },
    {
        _id:4,
        name:"product 4",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=4"
        }],


    },
     {
        _id:1,
        name:"product 5",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=5"
        }],


    },
    {
        _id:2,
        name:"product 6",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=6"
        }],


    },
    {
        _id:3,
        name:"product 7",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?randome=7"
        }],


    },
    {
        _id:4,
        name:"product 8",
        price:100,
        images:[{
            url:"https://picsum.photos/500/500?random=8"
        }],


    },

            ];
            setProducts(fetchProducts);
        },1000)
    },[])
  return (
    <div className='flex flex-col lg:flex-row'>
        {/* MObile  FLiter button */}
        <button className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter  className='mr-2'/>
        </button>
        {/* filter Sidebar */}
        <div ref={sidebarRef}>
        <FilterSidebar/>
        </div>

    </div>
  )
}

export default CollectionPage