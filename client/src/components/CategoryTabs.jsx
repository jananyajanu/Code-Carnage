import React from "react";

const categories = [
  "All",
  "Environmental Sustainability",
  "Renewable Energy",
  "Climate Change and Mitigation",
  "Waste Management",
  "Recycling",
  "Carbon Footprint Reduction",
  "Eco-Friendly Technologies",
  "Sustainable Finance and Investment",
];

const CategoryTabs = ({ selected, setSelected }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-secondary ${
            selected === cat ? "bg-secondary" : "bg-green-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
