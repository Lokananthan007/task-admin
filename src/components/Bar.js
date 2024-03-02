import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";

function Bar() {
  const [userData, setUserData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:4455/user");
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleCheckboxChange = (userId) => {
    if (selectedRows.includes(userId)) {
      setSelectedRows(selectedRows.filter(id => id !== userId));
    } else {
      setSelectedRows([...selectedRows, userId]);
    }
  };

  const handleSelectAllCheckboxChange = () => {
    setSelectedRows(selectedRows.length === 0 ? userData.map(user => user._id) : []);
  };

  const handleDelete = async () => {
    if (selectedRows.length === 0) {
      alert("Please select rows to delete.");
      return;
    }

    const isConfirmed = window.confirm("Are you sure you want to delete the selected rows?");

    if (isConfirmed) {
      try {
        const response = await fetch("http://localhost:4455/user/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedRows }),
        });

        if (response.ok) {
          alert("Selected rows deleted successfully");
          setSelectedRows([]);
          fetchUserData();
        } else {
          console.error("Failed to delete selected rows");
        }
      } catch (error) {
        console.error("Error deleting rows:", error);
      }
    }
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const userId = selectedRows[0];
      window.location.href = `/update/${userId}`;
    } else {
      alert("Please select only one row to edit at a time.");
    }
  };

  return (
    <div id="bar">
      <div className="header d-flex justify-content-between align-items-center">
        <h1>Dashbord</h1>
        <div className="d-flex">
          <Link className="me-5" onClick={handleDelete}><AiFillDelete className="icon" /></Link>
          <button className="me-5" onClick={handleEdit}><RxUpdate className="icon" /></button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  onChange={handleSelectAllCheckboxChange}
                  checked={selectedRows.length === userData.length}
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Dob</th>
              <th scope="col">Gender</th>
              <th scope="col">City</th>
              <th scope="col">Profile Image</th>
            </tr>
          </thead>
          <tbody>
            {userData.map(user => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{user.city}</td>
                 <td>
                  {user.profileImage && (
                    <img
                      src={`data:${user.profileImage.contentType};base64,${btoa(
                        String.fromCharCode.apply(null, new Uint8Array(user.profileImage.data))
                      )}`}
                      alt={'user'}
                      style={{ maxWidth: '50px', maxHeight: '50px' }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Bar;
