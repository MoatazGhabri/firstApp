import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListing from "./ProductListing";
import ProductCreate from "./ProductCreate";
import ProductEdit from "./ProductEdit";
import ProductDetail from "./ProductDetail";
import AdminPage from "./AdminPage"; 
import AdminLogin from "./AdminLogin";
import UserPage from "./users";
import SideBar from "./SideBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="P" element={<AdminLogin />} />
          <Route
            path="/*"
            element={
              <WithSidebar>
                <Routes>
                  <Route path="/" element={<ProductListing />} />
                  <Route path="product/create" element={<ProductCreate />} />
                  <Route path="product/edit/:id" element={<ProductEdit />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="product/command" element={<AdminPage />} />
                  <Route path="product/users" element={<UserPage />} />
                </Routes>
              </WithSidebar>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const WithSidebar = ({ children }) => {
  // Logic to conditionally show the sidebar
  const shouldShowSidebar = window.location.pathname !== "/";
  
  return (
    <div className="App">
      {shouldShowSidebar && <SideBar />}
      {children}
    </div>
  );
};

export default App;
