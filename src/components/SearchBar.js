import React from "react";
import { AiOutlineSearch } from "react-icons/ai"; // Import the search icon

const SearchBar = ({onChange}) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };
  
  return (
    <div className="relative md:w-2/3 md:my-4">
      <input
        className="border-2 placeholder-black py-3 px-2 w-full"
        type="text"
        onChange={handleInputChange}
        // value={value}
        placeholder="Search"
        // onChange={onChange}
        style={{ color: "black" }}
      />
      <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
    </div>
  );
};

export default SearchBar;
