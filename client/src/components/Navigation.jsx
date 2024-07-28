import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

function Navigations() {
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navBar">
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigations;
