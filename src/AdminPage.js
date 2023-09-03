import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./AdminPage.css";
const apiURL = process.env.REACT_APP_API_URL;

const AdminPage = () => {
  const [comments, setComments] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchComments();
    fetchUsersCount();
    fetchProductCount();

  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleConfirm = async (commentId) => {
    try {
      await axios.post(`${apiURL}/api/comments/${commentId}/confirm`);
      fetchComments();
    } catch (error) {
      console.error("Error confirming comment:", error);
    }
  };

  const handleRemove = async (commentId) => {
    try {
      await axios.delete(`${apiURL}/api/comments/${commentId}/remove`);
      fetchComments();
    } catch (error) {
      console.error("Error removing comment:", error);
    }
  };
  const fetchProductCount = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/products/count`);
      setProductCount(response.data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };
  const fetchUsersCount = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/users/count`);
      setUsersCount(response.data.count);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };
  return (
    <div className="container">
      {/* <Link to="/admin/dashboard" className="btn btn-secondary">List of product</Link> */}
      <div className="card-body">
          <div className="d-flex justify-content-between">
            <div className="stats-card">
              <h3>Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="stats-card">
              <h3>Orders</h3>
              <p>{comments.length}</p>
            </div>
            <div className="stats-card">
              <h3>Products</h3>
              <p>{productCount}</p>
            </div>
          </div>
          </div>
      <table className="table table-bordered">
            <thead className="bg-dark text-white">
            <h2>Orders</h2>

          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Number</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>{comment.name}</td>
              <td>{comment.lastName}</td>
              <td>{comment.email}</td>
              <td>{comment.address}</td>
              <td>{comment.number}</td>
              <td>{comment.productName}</td>
              <td>{comment.quantity}</td>
              <td>{comment.price}</td>
              <td>
                <img src={comment.image} alt="Product" />
              </td>
              <td>
                <button onClick={() => handleConfirm(comment._id)} className="btn btn-success">Confirm</button>
                <button onClick={() => handleRemove(comment._id)} className="btn btn-danger">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
