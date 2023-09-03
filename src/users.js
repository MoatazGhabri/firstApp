import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./AdminPage.css";

const UserPage = () => {
  const [users, setusers] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  useEffect(() => {
    fetchusers();
    fetchProductCount();
    fetchCommentsCount();
  }, []);

  const fetchusers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setusers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

 
  const handleRemove = async (usersId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${usersId}/remove`);
      fetchusers();
    } catch (error) {
      console.error("Error removing users:", error);
    }
  };
  const fetchProductCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products/count");
      setProductCount(response.data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  const fetchCommentsCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/comments/count");
      setCommentsCount(response.data.count);
    } catch (error) {
      console.error("Error fetching comment count:", error);
    }
  
  };
  return (
    <div className="container">
      {/* <Link to="/admin/dashboard" className="btn btn-secondary">List of product</Link> */}
    <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="stats-card">
              <h3>Users</h3>
              <p>{users.length}</p>
            </div>
            <div className="stats-card">
              <h3>Orders</h3>
              <p>{commentsCount}</p>
            </div>
            <div className="stats-card">
              <h3>Products</h3>
              <p>{productCount}</p>
            </div>
          </div>
          </div>
          
      <table className="table table-bordered">
            <thead className="bg-dark text-white">
            <h2>Users</h2>

          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Number</th>           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.number}</td>
              <td>
                <button onClick={() => handleRemove(user._id)} className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
