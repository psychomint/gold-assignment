import { useState } from "react";

const Sidebar = ({ filters, setFilters }) => {
  const categories = [
    "SWISS GOLD BAR",
    "UAE GOLD BAR",
    "LONDON COINS",
    "SAUDI BIN COINS",
  ];
  const weights = [
    "10 - 50 Gram",
    "50 - 100 Gram",
    "100 - 200 Gram",
    "200 - 10000 Gram",
  ];

  return (
    <div className="bg-[#0d1117] text-white p-4 border-r border-gray-700 w-full max-w-xs">
      <h2 className="text-lg font-semibold mb-4">Categories</h2>
      {categories.map((cat) => (
        <label key={cat} className="block mb-2">
          <input
            type="checkbox"
            checked={filters.categories.includes(cat)}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                categories: prev.categories.includes(cat)
                  ? prev.categories.filter((c) => c !== cat)
                  : [...prev.categories, cat],
              }))
            }
          />
          <span className="ml-2">{cat}</span>
        </label>
      ))}

      <h2 className="text-lg font-semibold mt-6 mb-4">Weight by gram</h2>
      {weights.map((range) => (
        <label key={range} className="block mb-2">
          <input
            type="radio"
            name="weight"
            checked={filters.weight === range}
            onChange={() => setFilters((prev) => ({ ...prev, weight: range }))}
          />
          <span className="ml-2">{range}</span>
        </label>
      ))}
    </div>
  );
};

export default Sidebar;