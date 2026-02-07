import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FilterSidebar from "./FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const CollectionPage = () => {
  const { collection } = useParams();

  // ✅ CORRECT usage
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.products
  );

  const queryParams = useMemo(() => {
  return Object.fromEntries(searchParams.entries());
}, [searchParams]);


  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, queryParams]);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target)
    ) {
      setIsSideBarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        ref={buttonRef}
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center mb-2"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300
        lg:relative lg:translate-x-0 lg:shadow-none`}
      >
        <FilterSidebar />
      </div>

      {/* Main Content */}
      <div className="grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collections</h2>

        <SortOptions />

        <ProductGrid
          products={products}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default CollectionPage;