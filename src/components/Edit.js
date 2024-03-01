import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { userId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          const response = await axios.get(`http://localhost:4455/user/${userId}`);
          const responseData = response.data;
    
          if (response.status === 200) {
            setFormData({
              name: responseData.name || "",
              email: responseData.email || "",
              city: responseData.city || "",
            });
          } else {
            setError("Failed to fetch user data. Server returned status: " + response.status);
          }
        } else {
          setError("User ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch user data. Error: " + error.message);
      }
    };
    
    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await axios.put(`http://localhost:4455/user/put/${userId}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccess(true);
        setError("");
      } else {
        setSuccess(false);
        setError("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setSuccess(false);
      setError("Failed to update user");
    }
  };

  return (
    <div className="edit-container">
      <h2>Update User</h2>
      <form onSubmit={handleSubmit} className="edit-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="edit-submit-btn">
            Update
          </button>
        </div>
        {success && <div className="edit-success-msg">User updated successfully!</div>}

        {error && <div className="edit-error-msg">{error}</div>}
      </form>
      
    </div>
  );
}

export default Edit;
