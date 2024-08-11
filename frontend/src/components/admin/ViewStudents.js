import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap'; // Import Spinner for loading indicator

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/view-students');
        setStudents(response.data);
        setLoading(false); // Set loading to false after data fetch
      } catch (error) {
        console.error('Fetching students failed', error);
        setError('Fetching students failed');
        setLoading(false); // Set loading to false on error
      }
    };

    fetchStudents();
  }, []);

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        background: 'linear-gradient(150deg,#E6F0DC, #94DEA5)', // Match gradient from ViewComplaints
        minHeight: '100vh',
        padding: '20px',
        margin: '0',
      }}
    >
      <div className="container-fluid">
        <h2 className="text-center mb-4 border border-dark rounded" style={{ color: '#023D54' }}>
          Students Overview
        </h2>
        {/* Loading and error handling */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <table className="table table-bordered d-fex justify-content-center">
            <thead>
              <tr style={{ backgroundColor: '#3c4542', color: 'white' }}>
                
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Room Number</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.roomNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ViewStudents;
