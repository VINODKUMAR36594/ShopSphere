import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["MEN", "WOMEN"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = [
    "red",
    "yellow",
    "blue",
    "green",
    "black",
    "brown",
    "pink",
    "white",
  ];
  const materials = ["Cotton", "Polyester", "Denim", "Wool", "Silk", "Linen"];
  const brands = ["Nike", "Adidas", "Zara", "H&M", "Levi's", "Uniqlo"];

  const [filter, setFilter] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    maxPrice: 100,
  });

  /* ===============================
     HANDLE INPUT CHANGE (STATE ONLY)
     =============================== */
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFilter((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter((v) => v !== value),
        };
      }

      return { ...prev, [name]: value };
    });
  };

  /* ===============================
     COLOR HANDLER
     =============================== */
  const handleColorSelect = (color) => {
    setFilter((prev) => ({ ...prev, color }));
  };

  /* ===============================
     PRICE HANDLER
     =============================== */
  const handlePriceChange = (value) => {
    setFilter((prev) => ({ ...prev, maxPrice: value }));
  };

  /* ===============================
     SYNC FILTER → URL (SAFE)
     =============================== */
  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (!Array.isArray(value) && value !== "" && value !== 0) {
        params.set(key, value);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`, { replace: true });
  }, [filter, navigate, setSearchParams]);

  /* ===============================
     LOG SELECTED ARRAYS
     =============================== */
  useEffect(() => {
    console.log("Sizes:", filter.size);
    console.log("Materials:", filter.material);
    console.log("Brands:", filter.brand);
  }, [filter.size, filter.material, filter.brand]);

  return (
    <div className="flex gap-6">
      <div className="p-4 w-64 border rounded bg-white">
        <h3 className="text-xl font-semibold mb-4">Filters</h3>
        CATEGORY
        {categories.map((cat) => (
          <label key={cat} className="flex items-center">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={filter.category === cat}
              onChange={handleChange}
            />
            <span className="ml-2">{cat}</span>
          </label>
        ))}
        GENDER
        {genders.map((gen) => (
          <label key={gen} className="flex items-center">
            <input
              type="radio"
              name="gender"
              value={gen}
              checked={filter.gender === gen}
              onChange={handleChange}
            />
            <span className="ml-2">{gen}</span>
          </label>
        ))}
        COLOR
        <div className="flex gap-2 my-3 flex-wrap">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleColorSelect(color)}
              className={`w-7 h-7 rounded-full border 
                ${filter.color === color ? "ring-2 ring-black" : ""}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        SIZE
        {sizes.map((size) => (
          <label key={size} className="flex items-center">
            <input
              type="checkbox"
              name="size"
              value={size}
              checked={filter.size.includes(size)}
              onChange={handleChange}
            />
            <span className="ml-2">{size}</span>
          </label>
        ))}
        MATERIAL
        {materials.map((mat) => (
          <label key={mat} className="flex items-center">
            <input
              type="checkbox"
              name="material"
              value={mat}
              checked={filter.material.includes(mat)}
              onChange={handleChange}
            />
            <span className="ml-2">{mat}</span>
          </label>
        ))}
        BRAND
        {brands.map((brand) => (
          <label key={brand} className="flex items-center">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              checked={filter.brand.includes(brand)}
              onChange={handleChange}
            />
            <span className="ml-2">{brand}</span>
          </label>
        ))}
        PRICE
        <input
          type="range"
          min="0"
          max="100"
          value={filter.maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full mt-3"
        />
        <p>Max Price: ${filter.maxPrice}</p>
      </div>
    </div>
  );
};

export default FilterSidebar;
