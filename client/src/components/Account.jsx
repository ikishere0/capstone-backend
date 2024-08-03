import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccount } from "../slices/accountSlice";
import { setLikedPhotos } from "../slices/likedPhotosSlice";

function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.account.user);
  const likedPhotos = useSelector((state) => state.likedPhotos);
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
        console.log('API Response Data:', data);
        if (response.ok) {
          dispatch(setAccount(data));
        } else {
          if (response.status === 401 && data.error === "Token expired.") {
            alert("Session expired. Please log in again.");
            navigate("/login");
          } else {
            throw new Error("Failed to fetch account data: " + data.message);
          }
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

  useEffect(() => {
    const fetchLikedPhotos = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }
        const response = await fetch(`${API_URL}/user/likedPhotos`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log("Liked photos fetched:", data);
        if (response.ok) {
          dispatch(setLikedPhotos(data));
        } else {
          if (response.status === 401 && data.error === "Token expired.") {
            alert("Session expired. Please log in again.");
            navigate("/login");
          } else {
            throw new Error("Failed to fetch liked photos: " + data.message);
          }
        }
      } catch (error) {
        setError(error.message);
        navigate("/login");
      }
    };
    fetchLikedPhotos();
  }, [dispatch, navigate]);

  return (
    <div className="account-container">
      <div className="account">
        {loading && <p>Loading... Please wait</p>}
        {error && <p>{error}</p>}
        {user && user.firstName && user.lastName && user.email ? (
          <div>
            <h2>ACCOUNT DETAILS</h2>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>No account details available</p>
        )}
        <div>
          <h2>LIKED</h2>
          {likedPhotos.length === 0 ? (
            <p>Search weather and like photos!</p>
          ) : (
            <div className="image-grid">
              {likedPhotos.map((photo) => (
                <div key={photo.id} className="image-item">
                  <img
                    src={`http://localhost:3000${photo.url}`}
                    alt="liked"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <p>{photo.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
