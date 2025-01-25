"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex flex-wrap justify-between gap-6 items-center">
      <div className="flex flex-wrap gap-4">
        {/* Type Filter */}
        <select
          name="type"
          className="py-3 px-4 rounded-xl text-sm font-medium bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={handleFilterChange}
        >
          <option>Type</option>
          <option value="suits">Suits and Blazers</option>
          <option value="tshirts">T Shirts And Polos</option>
          <option value="shirts">Shirts</option>
          <option value="sweatshirts">SweatShirts</option>
          <option value="denim">Denim</option>
          <option value="pants">Pant and Shorts</option>
          <option value="dreses">Dresses</option>
          <option value="skirts">Skirts</option>
          <option value="coats">Coats and Jakets</option>
        </select>

        {/* Price Range Inputs */}
        <input
          type="text"
          name="min"
          placeholder="Min Price"
          className="text-sm py-3 px-4 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="Max Price"
          className="text-sm py-3 px-4 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={handleFilterChange}
        />

        {/* Category Filter */}
        <select
          name="cat"
          className="py-3 px-4 rounded-xl text-sm font-medium bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={handleFilterChange}
        >
          <option>Category</option>
          <option value="newArrival">New Arrival</option>
          <option value="popular">Popular</option>
          <option value="popular">Men</option>
          <option value="popular">Women</option>
          <option value="popular">Children</option>
        </select>

        {/* All Filters Dropdown */}
        {/*      <select
          name="allFilters"
          className="py-3 px-4 rounded-xl text-sm font-medium bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        >
          <option>All Filters</option>
        </select> */}
      </div>

      {/* Sort Dropdown */}
      <div>
        <select
          name="sort"
          className="py-3 px-4 rounded-xl text-sm font-medium bg-white border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          onChange={handleFilterChange}
        >
          <option>Sort By</option>
          <option value="asc price">Price (low to high)</option>
          <option value="desc price">Price (high to low)</option>
          <option value="asc lastUpdated">Newest</option>
          <option value="desc lastUpdated">Oldest</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
