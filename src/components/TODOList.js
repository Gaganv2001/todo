import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { doc, serverTimestamp, updateDoc, deleteDoc } from "firebase/firestore";
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

  const deleteTodo = async () => {
    await deleteDoc(doc(db, `user/${user.uid}/todos/${docID}`));
    getTodos();
    setAnchorEl(null);
  };

  return (
    <div className="border-b-2 py-3 px-2 flex flex-row justify-between items-center md:items-center">
      <div className="w-full md:w-5/6 md:mr-4 text-wrap">
        <div className="flex items-center text-wrap">
          <p className="text-2xl text-black overflow-wrap break-all font-bold">{title}</p>
        </div>
        <p className="text-black overflow-wrap break-all">{desc}</p>
      </div>

      <div className="">
        {status === "Completed" && (
          <FaCheck className="ml-2 text-inherit" color="green" size={26}/>
        )}
        {status === "Favorite" && (
          <FaStar className="ml-2 text-inherit" color="gold" size={26}/>
        )}  
      </div>
      <div className="">
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
        <MenuItem onClick={deleteTodo}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

export default TODOList;
