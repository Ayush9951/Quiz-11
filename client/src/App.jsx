import { Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";
import Login from "./pages/Login";

import { Toaster } from "react-hot-toast";
import User from "./pages/User";
import ViewQuestions from "./pages/ViewQuestions";
import CreateTest from "./pages/createTest";
import ViewResults from "./pages/ViewResults";
import AttemptedTests from "./pages/AttemptedTests";
import GiveTest from "./pages/GiveTest";

function App() {
  const type = localStorage.getItem("type");

  return (
    <>
      <div>
        <Toaster />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={type === "Admin" ? <Admin /> : <Login />}
          />

          <Route
            path="/admin/viewQuestions"
            element={type === "Admin" ? <ViewQuestions /> : <Login />}
          />
          <Route
            path="/admin/createTest"
            element={type === "Admin" ? <CreateTest /> : <Login />}
          />
          <Route
            path="/admin/viewResults"
            element={type === "Admin" ? <ViewResults /> : <Login />}
          />

          <Route
            path="/user"
            element={type === "User" ? <User /> : <Login />}
          />
          <Route
            path="/user/attemptedTests"
            element={type === "User" ? <AttemptedTests /> : <Login />}
          />
          <Route
            path="/user/giveTest"
            element={type === "User" ? <GiveTest /> : <Login />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
