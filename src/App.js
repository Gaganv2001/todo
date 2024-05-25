import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Protected from "./components/Protected";
import { ListContextProvider } from "./context/ListContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <ListContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route
                path="/home"
                element={
                  <Protected>
                    <Dashboard />
                  </Protected>
                }
              />
            </Routes>
          </BrowserRouter>
        </ListContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
