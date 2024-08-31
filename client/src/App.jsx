import { Routes, Route, Navigate } from "react-router-dom";

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
  return (
    <>
      <div>
        <Toaster />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin/viewQuestions" element={<ViewQuestions />} />
          <Route path="/admin/createTest" element={<CreateTest />} />
          <Route path="/admin/viewResults" element={<ViewResults />} />

          <Route path="/user" element={<User />} />
          <Route path="/user/attemptedTests" element={<AttemptedTests />} />
          <Route path="/user/giveTest" element={<GiveTest />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
