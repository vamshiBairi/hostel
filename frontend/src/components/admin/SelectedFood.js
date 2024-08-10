import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectedFoodAdmin() {
  const [foodSummary, setFoodSummary] = useState([]);

  useEffect(() => {
    const fetchFoodSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/selected-food');
        setFoodSummary(response.data);
      } catch (error) {
        console.error('Failed to fetch food summary', error);
      }
    };

    fetchFoodSummary();
  }, []);

  const handleRefresh = async () => {
    try {
      await axios.post('http://localhost:5000/admin/refresh-food-selection');
      setFoodSummary([]);
      alert('Food selection data has been refreshed.');
    } catch (error) {
      console.error('Failed to refresh food selection data', error);
      alert('Failed to refresh data');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Food Selection Summary</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Meal Type</th>
            <th>Food Item</th>
            <th>Number of Selections</th>
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
      <button className="btn btn-danger" onClick={handleRefresh}>Refresh Data</button>
    </div>
  );
}

export default SelectedFoodAdmin;
