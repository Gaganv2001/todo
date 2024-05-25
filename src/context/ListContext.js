import React, { createContext, useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";

const ListContext = createContext();

export const ListContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const [todos, setTodos] = useState([]);
  const [listloading, setListLoading] = useState(false);

  useEffect(() => {
    getTodos();
  }, [user]);

  // const getTodos = async () => {
  //   onSnapshot(collection(db, `user/${user.uid}/todos`), (snapshot) => {
  //     setTodos(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         desc: doc.data().Description,
  //         title: doc.data().Title,
  //         // status: doc.data().Status,
  //       }))
  //     );
  //   });
  // };

  const getTodos = async () => {
    try {
      // Before fetching, set listloading to true
      setListLoading(true);
      onSnapshot(collection(db, `user/${user.uid}/todos`), (snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            desc: doc.data().Description,
            title: doc.data().Title,
            status: doc.data().Status,
          }))
        );
        // After fetching, set listloading back to false
        setListLoading(false);
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
      // Ensure listloading is set back to false in case of error
      setListLoading(false);
    }
  };

  return (
    <ListContext.Provider value={{ todos, setTodos, listloading, getTodos }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => React.useContext(ListContext);
