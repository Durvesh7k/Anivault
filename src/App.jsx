import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AddBySearch from "./pages/AddBySearch";
import { Navbar } from "./components/Navbar";
import DataProvider from "./context/DataProvider";
import "./App.css";

const App = () => {
  return (
    <DataProvider>
      <div className="relative w-full h-screen">
        {/* Background Video */}
        <video
          className="fixed top-0 w-full h-full left-0 object-cover z-[-1]"
          autoPlay
          loop
          playsInline
          muted
        >
          <source src="/videos/zoro.mp4"type="video/mp4" />
        </video>

        <div className="absolute top-0 left-0 bg-black bg-opacity-50"></div>

        <div className="relative z-10 flex flex-col">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/anime/:id" element={<AnimeDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/add-search" element={<AddBySearch />} />
            </Routes>
          </Router>
        </div>
      </div>
    </DataProvider>
  );
};

export default App;
