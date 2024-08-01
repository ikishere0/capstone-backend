import { useState } from "react";

const AdminUpload = () => {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("all");
  const [minTemp, setMinTemp] = useState("");
  const [maxTemp, setMaxTemp] = useState("");
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("photo", file);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("minTemp", minTemp);
    formData.append("maxTemp", maxTemp);

    try {
      const response = await fetch("http://localhost:3000/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Photo uploaded successfully");
        setDescription("");
        setCategory("all");
        setMinTemp("");
        setMaxTemp("");
        setFile(null);
      } else {
        alert("Failed to upload photo");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Error uploading photo");
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
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Temp (°C)"
        value={minTemp}
        onChange={(e) => setMinTemp(e.target.value)}
      />
      <input
        type="number"
        placeholder="Max Temp (°C)"
        value={maxTemp}
        onChange={(e) => setMaxTemp(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default AdminUpload;
