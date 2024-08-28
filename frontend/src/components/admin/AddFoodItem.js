import React, { useState } from 'react';
import axios from 'axios';
import { FaAppleAlt } from 'react-icons/fa';
import { MdRestaurantMenu } from 'react-icons/md';
import { BsCardText } from 'react-icons/bs';
import { FiLink } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AddFoodItem() {
  const [mealType, setMealType] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [itemDescription, setItemDescription] = useState(['']);
  const [imageUrl, setImageUrl] = useState('');

  const handleAddFoodItem = async (e) => {
    const token = localStorage.getItem('token');
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/add-food-item', {
        mealType,
        foodItem,
        items:itemDescription,
        imageUrl
      }, { headers: { Authorization: `Bearer ${token}` }});
      toast.success('Successfully Added Food Item');
      console.log(response.data);
      setMealType('');
      setFoodItem('');
      setItemDescription(['']);
      setImageUrl('');
    } catch (error) {
      toast.error('Failed to Add');
      console.error('Adding food item failed', error);
    }
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescription = [...itemDescription];
    updatedDescription[index] = value;
    setItemDescription(updatedDescription);
  };

  const handleAddDescriptionField = () => {
    setItemDescription([...itemDescription, '']);
  };

  const handleRemoveDescriptionField = (index) => {
    setItemDescription(itemDescription.filter((_, i) => i !== index));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(150deg,#E6F0DC, #94DEA5)',
        minHeight: '100vh',
        width:'100%',
        padding: '20px',
        margin: '0',
      }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{
          backgroundColor: '#94DEA5 ',
          borderRadius: '15px',
          width: '100%',
          maxWidth: '500px'
        }}
      >
        <h2 className="mb-4 text-center" style={{ color: '#023D54' }}>
          Add Food Item
        </h2>
        <form onSubmit={handleAddFoodItem}>
          <div className="mb-3">
            <label htmlFor="mealType" className="form-label" style={{ color: 'white' }}>
              <MdRestaurantMenu className="me-2" /> Meal Type
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
              <FaAppleAlt className="me-2" /> Food Item
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
            <label className="form-label" style={{ color: 'white' }}>
              <BsCardText className="me-2" /> Item Description
            </label>
            {itemDescription.map((desc, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder={`Description ${index + 1}`}
                  value={desc}
                  onChange={(e) => handleDescriptionChange(index, e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveDescriptionField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddDescriptionField}
            >
              Add Another Description
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label" style={{ color: 'white' }}>
              <FiLink className="me-2" /> Image URL
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
            style={{ backgroundColor: '#023D54', borderColor: 'black' }}
          >
            Add Food Item
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export default AddFoodItem;
