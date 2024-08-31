import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SelectedFoodAdmin() {
  const token = localStorage.getItem("token");
  const [foodSummary, setFoodSummary] = useState([]);

  useEffect(() => {
    const fetchFoodSummary = async () => {
      try {
        const response = await axios.get(
          "https://hostel-api.vercel.app/admin/selected-food",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFoodSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch food summary", error);
      }
    };

    fetchFoodSummary();
  }, [token]);

  const handleRefresh = async () => {
    try {
      await axios.post(
        "https://hostel-api.vercel.app/admin/refresh-food-selection",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFoodSummary([]);
      toast.success("Food selection data has been refreshed.");
    } catch (error) {
      console.error("Failed to refresh food selection data", error);
      toast.error("Failed to refresh data");
    }
  };

  return (
    <div className="container my-5"
    style={{overflowX:"Scroll"}}>
      <h2 className="mb-4 text-center">Food Selection Summary</h2>
      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th style={{ backgroundColor: "gray"}}>Meal Type</th>
              <th style={{ backgroundColor: "gray"}}>Food Item</th>
              <th style={{ backgroundColor: "gray"}}>Number of Selections</th>
            </tr>
          </thead>
          <tbody>
            {foodSummary.map((item, index) => (
              <tr key={index}>
                <td>{item._id.mealType}</td>
                <td>{item._id.foodItem}</td>
                <td>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-danger btn-lg" onClick={handleRefresh}>
          Refresh Data
        </button>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default SelectedFoodAdmin;
