import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FoodMenu() {
  const token = localStorage.getItem('token'); 
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/view-menu', { headers: { Authorization: `Bearer ${token}` }});
        setFoodItems(response.data);
      } catch (error) {
        toast.error("Please Login ");
        console.error('Fetching food items failed', error);
      }
    };
    fetchFoodItems();
  }, []);

  const handleSelectMeal = async (mealType, foodItem) => {
    try {
      const response = await axios.post('http://localhost:5000/student/select-meal', { mealType, foodItem }, { headers: { Authorization: `Bearer ${token}` }});
        toast.success(response.data.message);
      
      
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Please Try Again Later"); 
      }
    }
  };

  const renderMealSection = (mealType, mealItems) => (
    <div className="my-4">
      <div className='d-flex justify-content-center'>
        <h2 className="text-center mb-4 border-bottom border-dark " style={{ color: '#023D54', width: "8rem" }}>{mealType}</h2>
      </div>
      <div className="container-fluid">
        <div className="row overflow-auto flex-nowrap">
          {mealItems.map((item) => (
            <div key={item._id} className="col-sm-6 col-md-4 col-lg-3 px-2">
              <div className="card" style={{ width: '18rem' }}>
                <h5 className="card-title text-center pt-2 border rounded">{item.foodItem.toUpperCase()}</h5>
                <div className="d-flex justify-content-center">
                  <img src={item.url} className="card-img-top p-1" alt={item.foodItem} />
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text">
                    <strong>Items:</strong>
                    <ul>
                      {item.items.map((subItem, index) => (
                        <li key={index}>{subItem}</li>
                      ))}
                    </ul>
                  </p>
                  <button
                    className="btn btn-primary mt-auto"
                    style={{ backgroundColor: '#023D54', borderColor: '#023D54' }}
                    onClick={() => handleSelectMeal(mealType.toLowerCase(), item.foodItem)}
                  >
                    Select {mealType}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const breakfastItems = foodItems.filter(item => item.mealType === 'breakfast');
  const lunchItems = foodItems.filter(item => item.mealType === 'lunch');
  const dinnerItems = foodItems.filter(item => item.mealType === 'dinner');

  return (
    <div
      className="container-fluid"
      style={{
        background: 'linear-gradient(150deg, #E6F0DC, #94DEA5)',
        minHeight: '100vh',
        padding: '20px',
        margin: '0',
      }}
    >
      {renderMealSection('Breakfast', breakfastItems)}
      {renderMealSection('Lunch', lunchItems)}
      {renderMealSection('Dinner', dinnerItems)}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default FoodMenu;
