import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import ListComponent from "../components/ListComponent";
import { toast } from "react-toastify";
// index.js or App.js or similar entry file
import "react-toastify/dist/ReactToastify.css";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useList } from "../context/ListContext";
import logo from "../assets/images/Vector.png";

const Dashboard = () => {
  const { user, logOut } = UserAuth();
  const { getTodos } = useList();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // const addToDo = async () => {

  //   if (!title.trim() || !description.trim()) {
  //     toast.error("Title and description cannot be empty.", {
  //       position: "top-right",
  //     });
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     await addDoc(collection(db, `user/${user.uid}/todos`), {
  //       Title: title,
  //       Description: description,
  //       Status: null,
  //       time: serverTimestamp(),
  //     });
  //     getTodos();
  //     toast.success("Task added successfully !", {
  //       position: "top-right",
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   } finally {
  //     setTitle("");
  //     setDescription("");
  //     setLoading(false);
  //   }
  // };

  const addToDo = async () => {
    // Check for empty title or description
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description cannot be empty.", {
        position: "top-right",
      });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, `user/${user.uid}/todos`), {
        Title: title.trim(), // Ensure no leading/trailing spaces
        Description: description.trim(), // Ensure no leading/trailing spaces
        Status: null,
        time: serverTimestamp(),
      });
      await getTodos(); // Ensure getTodos is awaited if it's an async function
      toast.success("Task added successfully!", {
        position: "top-right",
      });
    } catch (err) {
      console.error("Error adding task:", err); // Log the entire error object for more details
      toast.error("Failed to add task. Please try again.", {
        position: "top-right",
      }); // Notify the user of the error
    } finally {
      setTitle("");
      setDescription("");
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
   
    <div className="md:flex md:justify-between flex-col md:flex-row md:divide-x-2 md:p-9  md:h-screen">
    <div className="flex-1 md:flex md:items-center justify-center mx-8 md:mx-0 md:relative my-4 md:my-0">
      <div className="flex flex-row justify-between items-center w-full p-3 md:absolute md:top-0 md:left-0 md:px-9">
        <img
          loading="lazy"
          src={logo}
          alt="cover"
          style={{ width: 40, height: 40 }}
        />
        <div
          className="px-3 bg-[#597EF7] rounded"
          onClick={handleSignOut}
        >
          <p className="text-white">LOGOUT</p>
        </div>
      </div>
      <div className="md:w-7/12">
        <h1 className="text-black-600 font-bold text-2xl text-center">
          TO DO
        </h1>

        <p className="text-center">
          Organize your tasks efficiently with our intuitive todo app. Easily
          add, edit, and delete tasks to keep track of your daily activities.
          Filter tasks by categories like Completed, Favorite, and Deleted.
          The search function allows quick access to specific tasks, ensuring
          you never miss a detail. Stay productive and manage your workload
          seamlessly with our feature-rich todo app.
        </p>
        <div className="flex flex-col items-center">
          <TextInput
            value={title}
            placeholder="Title"
            onChange={handleTitleChange}
          />
          <TextInput
            value={description}
            placeholder="Description"
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="flex flex-col items-center">
          <Button onClick={addToDo} loading={loading} />
        </div>
      </div>
    </div>
    <div className="flex-1 overflow-auto"> {/* Added overflow-auto */}
      <ListComponent />
    </div>
  </div>
  );
};

export default Dashboard;
