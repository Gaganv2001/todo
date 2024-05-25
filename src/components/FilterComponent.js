import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const FilterComponent = ({ onFilterChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (filter) => {
    setAnchorEl(null);
    onFilterChange(filter);
  };

  return (
    <div className="relative md:w-1/3 my-4">
      <div
        className="border-2 placeholder-black py-3 px-2 w-full flex flex-row justify-between items-center"
        onClick={handleClick}
      >
        <p>Filter By</p>
        <FaChevronDown />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose("All")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose("All")}>All</MenuItem>
        <MenuItem onClick={() => handleClose("Completed")}>Completed</MenuItem>
        <MenuItem onClick={() => handleClose("Favorite")}>Favorite</MenuItem>
        <MenuItem onClick={() => handleClose("Deleted")}>Deleted</MenuItem>
      </Menu>
    </div>
  );
};

export default FilterComponent;
