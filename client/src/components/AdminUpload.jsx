import { useState, useEffect } from "react";
import "./AdminUpload.css";

const AdminUpload = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("women");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("minTemp", minTemp);
    formData.append("maxTemp", maxTemp || 1000);

    try {
      const response = await fetch("http://localhost:3000/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Photo uploaded successfully");
        setDescription("");
        setCategory("women");
        setMinTemp("");
        setMaxTemp("");
        setFile(null);
        fetchPhotos();
      } else {
        alert("Failed to upload photo");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Error uploading photo");
    }
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/photos");
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Photo deleted successfully");
        fetchPhotos();
      } else {
        alert("Failed to delete photo");
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
      alert("Error deleting photo");
    }
  };

  return (
    <div>
      <h1>Upload Photo</h1>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="all">All</option>
        <option value="women">Women</option>
        <option value="men">Men</option>
      </select>
      <input
        type="number"
        placeholder="Min Temp (°F)"
        value={minTemp}
        onChange={(e) => setMinTemp(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Temp (°F)"
        value={maxTemp}
        onChange={(e) => setMaxTemp(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Uploaded Photos</h2>
      <div className="image-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="image-item">
            <img
              src={`http://localhost:3000${photo.url}`}
              alt="weather related"
              style={{ width: "100%", height: "auto" }}
            />
            <button
              className="delete-button"
              onClick={() => handleDelete(photo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUpload;
