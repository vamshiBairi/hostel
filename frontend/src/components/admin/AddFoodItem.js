import React, { useState } from 'react';
import axios from 'axios';

function AddFoodItem() {
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddFoodItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/add-food-item', { mealType, foodItem, itemDescription, imageUrl });
      console.log(response.data);
    } catch (error) {
      console.error('Adding food item failed', error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #C9DABF, #9CA986)',
        overflowX: 'hidden',
        padding: '0 15px'
      }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{
          backgroundColor: '#9CA986',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: 'white' }}>
          Add Food Item
        </h2>
        <form onSubmit={handleAddFoodItem}>
          <div className="mb-3">
            <label htmlFor="mealType" className="form-label" style={{ color: 'white' }}>
              Meal Type
            </label>
            <select
              className="form-control"
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
            >
              <option value="">Select Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="foodItem" className="form-label" style={{ color: 'white' }}>
              Food Item
            </label>
            <input
              type="text"
              className="form-control"
              id="foodItem"
              placeholder="Enter food item"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="itemDescription" className="form-label" style={{ color: 'white' }}>
              Item Description
            </label>
            <textarea
              className="form-control"
              id="itemDescription"
              rows="3"
              placeholder="Enter item description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label" style={{ color: 'white' }}>
              Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#3c4542', borderColor: 'black' }}
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddFoodItem;
