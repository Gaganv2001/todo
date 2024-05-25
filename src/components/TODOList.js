import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { useList } from "../context/ListContext";
import { FaCheck, FaStar } from "react-icons/fa";

const TODOList = ({ docID, title, desc, status }) => {
  const { user } = UserAuth();
  const { getTodos } = useList();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = async (updatedStatus) => {
    updateDoc(doc(db, `user/${user.uid}/todos/${docID}`), {
      Status: updatedStatus,
      time: serverTimestamp(),
    });
    getTodos();
    setAnchorEl(null);
  };

  return (
    <div className="border-b-2 py-3 px-2 w-full flex flex-row justify-between items-center">
      <div className="flex-grow">
        <div className="flex items-center">
          {" "}
          {/* Use flex to align title and icon horizontally */}
          <p className="text-2xl text-black">{title}</p> {/* Title */}
          {status === "Completed" && ( // Render tick mark for Completed status
            <FaCheck className="ml-2" style={{ color: "green" }} /> // Adjust margin as needed
          )}
          {status === "Favorite" && ( // Render star for Favorite status
            <FaStar className="ml-2" style={{ color: "gold" }} /> // Adjust margin as needed
          )}
        </div>
        <p className="text-black">{desc}</p>
      </div>

      <div>
        <BsThreeDotsVertical onClick={handleClick} />
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
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
        <MenuItem onClick={() => updateStatus("Completed")}>Completed</MenuItem>
        <MenuItem onClick={() => updateStatus("Favorite")}>Favorite</MenuItem>
        <MenuItem onClick={() => updateStatus("Deleted")}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default TODOList;
