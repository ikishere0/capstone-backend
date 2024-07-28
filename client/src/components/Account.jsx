import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccount } from "../slices/accountSlice";

function Account() {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = "http://localhost:3000/api";

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const response = await fetch(`${API_URL}/user/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          dispatch(setAccount(data));
        } else {
          throw new Error("Failed to fetch account data: " + data.message);
        }
      } catch (error) {
        setError(error.message);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, [dispatch, navigate]);

  const handleDeleteAccount = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await fetch(`${API_URL}/user/deleteAccount`, {
        // API 경로 수정
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        sessionStorage.removeItem("token");
        navigate("/login");
      } else {
        const data = await response.json();
        setError(data.message || "Failed to delete account");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="account-container">
      <div className="account">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {account && (
          <div>
            <h2>Account Details</h2>
            <p>First Name: {account.firstName}</p>
            <p>Last Name: {account.lastName}</p>
            <p>Email: {account.email}</p>
            <button onClick={handleDeleteAccount}>Delete Account</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;
