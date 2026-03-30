import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Components/LoginComponent";
import SignUp from "./Components/SignupComponent";
import PropertyList from "./Components/PropertyLists";
import AppNavbar from "./Components/AppNavbar";
import PropertyDetail from "./Components/PropertyDetail";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const showUser = location.pathname.startsWith("/listings");

  return (
    <>
      <AppNavbar showUser={showUser} />
      {children}
    </>
  );
};

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/listings" element={<PropertyList />} />
          <Route path="/listings/:id" element={<PropertyDetail />} />
        </Routes>
      </AppLayout>
    </div>
  );
}

export default App;
