import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";
import "./App.css";
import { Navbar } from './components/Navbar'
import Login from "./pages/Login";
import DataProvider from "./context/DataProvider";
import Admin from "./pages/Admin";
import AddBySearch from "./pages/AddBySearch";


const App = () => {
  return (
    <DataProvider>
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
    </DataProvider>
  );
};

export default App;
