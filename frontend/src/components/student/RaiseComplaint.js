import React, { useState } from 'react';
import axios from 'axios';

function RaiseComplaint() {
  const [complaintText, setComplaintText] = useState('');

  const handleRaiseComplaint = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/student/raise-complaint', { complaintText });
      console.log(response.data);
    } catch (error) {
      console.error('Raising complaint failed', error);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="text-center mb-4 border border-dark rounded" style={{ color: '#023D54' }}>Raise a Complaint</h2>
      <form onSubmit={handleRaiseComplaint} className="border border-dark rounded p-4" style={{ background: '#E6F0DC' }}>
        <div className="form-group">
          <label htmlFor="complaintText">Complaint Text</label>
          <textarea
            id="complaintText"
            className="form-control"
            rows={3}
            placeholder="Enter complaint text"
            value={complaintText}
            onChange={(e) => setComplaintText(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Raise Complaint</button>
      </form>
    </div>
  );
}

export default RaiseComplaint;
