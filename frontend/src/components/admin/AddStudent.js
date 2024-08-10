import React, { useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaDoorClosed, FaLock } from 'react-icons/fa';

function AddStudent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/admin/add-student', { name, email, phone, roomNumber, password });
      console.log(response.data);
    } catch (error) {
      console.error('Adding student failed', error);
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
          Enter Student Details
        </h2>
        <form onSubmit={handleAddStudent}>
          <div className="mb-3">
            <label htmlFor="studentName" className="form-label" style={{ color: 'white' }}>
              <FaUser className="me-2" /> Name
            </label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentEmail" className="form-label" style={{ color: 'white' }}>
              <FaEnvelope className="me-2" /> Email
            </label>
            <input
              type="email"
              className="form-control"
              id="studentEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentPhone" className="form-label" style={{ color: 'white' }}>
              <FaPhone className="me-2" /> Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="studentPhone"
              placeholder="Enter phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentRoomNumber" className="form-label" style={{ color: 'white' }}>
              <FaDoorClosed className="me-2" /> Room Number
            </label>
            <input
              type="text"
              className="form-control"
              id="studentRoomNumber"
              placeholder="Enter room number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="studentPassword" className="form-label" style={{ color: 'white' }}>
              <FaLock className="me-2" /> Password
            </label>
            <input
              type="password"
              className="form-control"
              id="studentPassword"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ backgroundColor: '#3c4542', borderColor: 'black' }}
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
