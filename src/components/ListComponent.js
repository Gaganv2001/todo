import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import FilterComponent from "./FilterComponent";
import TODOList from "./TODOList";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import { Bounce, ToastContainer, toast } from "react-toastify";
import noData from "../assets/images/NoData.jpg";
// index.js or App.js or similar entry file
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import { useList } from "../context/ListContext";

const ListComponent = () => {
  const { todos, listloading } = useList();
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to hold the search term
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Update filteredTodos when todos change
    setFilteredTodos(todos);
  }, []);

  useEffect(() => {
    // Use a timer to set debounced search term after 300ms of no typing
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    // Cleanup the timer on every change
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // useEffect(() => {
  //   // Filter todos based on debounced search term
  //   console.log("deboumced searcg teerm", debouncedSearchTerm);
  //   const filtered = todos.filter(
  //     (todo) =>
  //       todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
  //       todo.desc.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  //   );
  //   setFilteredTodos(filtered);
  // }, [debouncedSearchTerm, todos]);

  useEffect(() => {
    const filtered = todos.filter((todo) => {
      const matchesSearch =
        todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        todo.desc.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && todo.status === "Completed") ||
        (filter === "Favorite" && todo.status === "Favorite") ||
        (filter === "Deleted" && todo.status === "Deleted");

      return matchesSearch && matchesFilter;
    });

    setFilteredTodos(filtered);
  }, [debouncedSearchTerm, todos, filter]);

  const handleSearch = (value) => {
    setSearchTerm(value); // Update search term state on every change
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="mx-4 md:mx-0 md:px-10 items-center justify-center p-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <p className="text-black font-bold text-2xl text-center md:text-left">
        TODO LIST
      </p>

      <div className="flex flex-col md:flex-row justify-between mt-11 md:gap-11">
        <SearchBar onChange={handleSearch} />
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>

      <div className="items-center justify-center mt-4 h-96 ">
        {listloading ? (
          <div className="flex items-center justify-center h-full">
            <p>Loading ...</p>
          </div>
        ) : filteredTodos.length > 0 ? (
          <div className="todo-list-container h-full overflow-y-auto w-full">
            {filteredTodos.map((todo) => (
              <TODOList
                key={todo.id}
                docID={todo.id}
                title={todo.title}
                desc={todo.desc}
                status={todo.status}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img src={noData} alt="No Data" className="w-1/2 md:w-1/4" />
            <p className="text-black mt-4">No tasks found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListComponent;
