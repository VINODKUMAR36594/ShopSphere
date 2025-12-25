import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FilterSlidebar = () => {
  const [searchParams] = useSearchParams();

  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    size: [],
    color: "",
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const genders=["MEN","WOMEN"]
  const sizes=["XS","S",'M',"l","xl","xxl"]
  const [priceRange, setPriceRange] = useState([0, 100]);
  const colors=[
    "Red","Yellow","blue","green","black","brown","pink","white",
  ]
  // Array of clothing brands
const brands = [
  "Nike",
  "Adidas",
  "Zara",
  "H&M",
  "Levi's",
  "Uniqlo",
  "Gucci"
];

// Array of clothing materials
const materials = [
  "Cotton",
  "Polyester",
  "Denim",
  "Wool",
  "Silk",
  "Linen",
  "Leather"
];


  const categories = ["Top Wear", "Bottom Wear"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    const min = params.minPrice ? Number(params.minPrice) : 0;
    const max = params.maxPrice ? Number(params.maxPrice) : 100;

    setFilter({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: min,
      maxPrice: max,
    });

    setPriceRange([min, max]);
  }, [searchParams.toString()]);

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">
        Filter
      </h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Category
        </label>

        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              checked={filter.category === category}
               onChange={(e) =>
        setFilter((prev) => ({ ...prev, category: e.target.value }))
      }
              // readOnly
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
{/* gender Filter */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Gender
        </label>

        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              checked={filter.gender === gender}
               onChange={(e) =>
        setFilter((prev) => ({ ...prev, gender: e.target.value }))
      }
              // readOnly
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color)=>{
           return( <button key={color}
            name="color"
            className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105"
            style={{backgroundColor:color.toLowerCase()}}></button>
         ); })}
        </div>
      </div>
         {/* size fliter */}
         <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Size</label>
          {sizes.map((size)=>{
            return(
              <div key={size} className="flex items-center mb-1">
                <input type="checkbox" name='size' className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"/>
                <span className="text-gray-700 ">{size.toUpperCase()}</span>
              </div>
            )
          })}
         </div>

{/* materials */}

<div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Size</label>
          {materials.map((material)=>{
            return(
              <div key={material} className="flex items-center mb-1">
                <input type="checkbox" name='size' className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"/>
                <span className="text-gray-700 ">{material.toUpperCase()}</span>
              </div>
            )
          })}
         </div>
{/* brands */}
<div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Size</label>
          {brands.map((brand)=>{
            return(
              <div key={brand} className="flex items-center mb-1">
                <input type="checkbox" name='size' className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"/>
                <span className="text-gray-700 ">{brand.toUpperCase()}</span>
              </div>
            )
          })}
         </div>

         {/* {/price range fliter*  */}
         <div className="mb-8 ">
          <label className="block text-gray-600 font-medium mb-2">Price Range</label>
          <input type="range" name="PriceRange" min={0} max={100} className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
          <div className="flex justify-between text-gray-600 mt-2">
            <span >$0</span>
            <span>${priceRange[1]}</span>
           
          </div>
         </div>
    </div>
  );
};

export default FilterSlidebar;
