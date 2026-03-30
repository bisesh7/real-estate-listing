import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/LoginComponent";
import SignUp from "./Components/SignupComponent";
import PropertyList from "./Components/PropertyLists";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/listings" element={<PropertyList />} />
      </Routes>
    </div>
  );
}

export default App;
