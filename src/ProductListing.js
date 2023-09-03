// ProductListing.js (frontend)

import React, { useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa"; // Import the user icon
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [usersCount, setUsersCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    fetchProducts();
    fetchUsersCount();
    fetchCommentsCount();
  }, []);
  const adminUsername = localStorage.getItem("adminUsername");

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
   
    navigate("/");
  };
  

  const fetchProducts = () => {
    axios.get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to remove this product?")) {
      axios.delete(`http://localhost:5000/api/products/${id}`)
        .then(() => {
          alert("Product removed successfully.");
          fetchProducts();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const fetchUsersCount = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/count");
      setUsersCount(response.data.count);
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
     <nav className="admin-nav">
        <div className="admin-profile">
          <span className="admin-name">{adminUsername}</span>
          <div className="dropdown">
            <p className="dropbtn">
              <FaUserCircle className="dropdown-icon" />
            </p>
            <div className="dropdown-content">
              <a onClick={handleLogout}>Logout</a>
            </div>
          </div>
        </div>
      </nav>
          <div className="d-flex justify-content-between">
            <div className="stats-card">
              <h3>Users</h3>
              <p>{usersCount}</p>
            </div>
            <div className="stats-card">
              <h3>Orders</h3>
              <p>{commentsCount}</p>
            </div>
            <div className="stats-card">
              <h3>Products</h3>
              <p>{products.length}</p>
            </div>
          </div>
          <div className="divbtn">
          <Link to="/product/create" className="btn btn-secondary">+</Link>


          </div>
          <table className="table table-bordered">
            
            <thead className="bg-dark text-white">
            <h2>Products</h2>

              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Image</td>
                <td>Action</td>
              </tr>

            </thead>
            <tbody>
              
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <img src={product.image} alt={product.name} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                  </td>
                  <td>
                    <Link to={`/product/edit/${product._id}`} className="btn btn-success">Edit</Link>
                    <button onClick={() => removeProduct(product._id)} className="btn btn-danger">Remove</button>
                    <Link to={`/product/${product._id}`} className="btn btn-primary">Details</Link>
                  </td>
                </tr>
                
              ))}
              
            </tbody>
            
          </table>

        </div>
  );
};

export default ProductListing;
