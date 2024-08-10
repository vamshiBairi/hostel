import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';


function FoodMenu() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/student/view-menu');
        setFoodItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Fetching food items failed', error);
      }
    };

    fetchFoodItems();
  }, []);

  const handleSelectMeal = async (mealType, foodItem) => {
    try {
      const response = await axios.post('http://localhost:5000/student/select-meal', { mealType, foodItem });
      console.log('Meal selected:', response.data);
      <Alert severity="warning">Success.</Alert>

    } catch (error) {
      console.error('Selecting meal failed', error);
       alert(error);
    }
  };

  const renderMealSection = (mealType, mealItems) => (
    <div className="my-4">
      <h2 className="text-center text-uppercase border border-dark rounded m-8" style={{ color: '#023D54' }}>{mealType}</h2>
      <div className="container-fluid">
        <div className="row overflow-auto flex-nowrap">
          {mealItems.map((item) => (
            <div key={item._id} className="col-md-3 px-2">
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
                    onClick={() => handleSelectMeal(mealType, item.foodItem)}
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
    </div>
  );
}

export default FoodMenu;
