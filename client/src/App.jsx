import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Account from "./components/Account";
import Navigation from "./components/Navigation";
import WeatherSearch from "./components/WeatherSearch";

const App = () => {
  return (
    <Router>
      <Navigation />
      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Account />} />
          <Route path="/weathersearch" element={<WeatherSearch />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
