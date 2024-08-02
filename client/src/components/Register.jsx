import { useState } from "react";
import { registerUser } from "../api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setSuccessMessage("Registration successful!");
      setError("");
    } catch (error) {
      setError(error.response.data.message || "Registration failed");
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <h2>Register</h2>
        {error && (
          <p style={{ color: "red", fontSize: "1.5rem", fontWeight: "bold" }}>
            {error}
          </p>
        )}
        {successMessage && (
          <p style={{ color: "green", fontSize: "1.5rem", fontWeight: "bold" }}>
            {successMessage}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
