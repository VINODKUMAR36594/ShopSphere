import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaFilter } from 'react-icons/fa';
import FilterSidebar from '../components/Products/FilterSlidebar';
import SortOptions from '../components/Products/SortOptions';
<<<<<<< HEAD
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slices/productSlice';

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSidebarOpen(prev => !prev);
    // setTimeout(10000)

  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
      
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);
      dispatch(fetchProductsByFilters({ ...filters, limit: 20 }));
    }
  }, [collection, dispatch]);
>>>>>>> e57d00f154bfc8053367ce2b3195e46d5911e4dd

  return (
    <div className='flex flex-col lg:flex-row'>
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSideBar}
        className='lg:hidden border p-2 flex justify-center items-center'
      >
        <FaFilter className='mr-2' />
        Filters
      </button>
      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>
      <div className='flex-grow p-4'>
        <h2 className='text-2xl uppercase mb-4'>{formatCollectionName(collection || 'All')} Collection</h2>
        {/* Sort options */}
        <SortOptions/>
<<<<<<< HEAD
        {/* Proudct Grid */}
        <ProductGrid products={products} loading={loading} error={error}/>
=======
        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
>>>>>>> e57d00f154bfc8053367ce2b3195e46d5911e4dd
      </div>
    </div>
  );
};

export default CollectionPage;
