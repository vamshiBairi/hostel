import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Spinner } from 'react-bootstrap'; 
function ViewComplaints() {
  const token = localStorage.getItem('token');
  const [complaints, setComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/complaints', { headers: { Authorization: `Bearer ${token}` }});
        const sortedComplaints = response.data.sort((a, b) => {
          if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
          if (a.status !== 'Resolved' && b.status === 'Resolved') return -1;
          return new Date(b.date) - new Date(a.date);
        });
        setComplaints(sortedComplaints);
        setLoading(false);
      } catch (error) {
        console.error('Fetching complaints failed', error);
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };
  const deleteComplaint=async (id)=>{
    try {
      const response = await axios.post(`http://localhost:5000/admin/remove-complaint/${id}`,{},{ headers: { Authorization: `Bearer ${token}` }});
      console.log('Deleted complaint:', response.data);
      toast.success('Successfully closed complaint');
      setComplaints((prevComplaint) => prevComplaint.filter(item => item._id !== id));
      
    } catch (error) {
      console.error('Deleting complaint', error);
      toast.error('Failed');
    }
  }
  const handleUpdateStatus = async (id) => {
    const status = selectedStatus[id];
    if (!status) return;

    try {
      await axios.put(`http://localhost:5000/admin/update-complaint-status/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` }});
      setComplaints((prev) =>
        prev
          .map((complaint) =>
            complaint._id === id ? { ...complaint, status } : complaint
          )
          .sort((a, b) => {
            if (a.status === 'Resolved' && b.status !== 'Resolved') return 1;
            if (a.status !== 'Resolved' && b.status === 'Resolved') return -1;
            return new Date(b.date) - new Date(a.date);
          })
      );
      setSelectedStatus((prev) => ({
        ...prev,
        [id]: undefined,
      }));
      toast.success('Success');
    } catch (error) {
      toast.error('Error in updating');
      console.error('Updating status failed', error);
    }
  };

  return (
    <div
      className="d-flex  justify-content-center"
      style={{
        background: 'linear-gradient(150deg,#E6F0DC, #94DEA5)',
        minHeight: '100vh',
        padding: '20px',
        margin: '0',
      }}
    >
      {loading?(
        <div className="text-center">
        <Spinner animation="border" variant="primary" />
      </div>
      ):(
        <div className="container-fluid">
        <h2 className="text-center mb-4 border border-dark rounded" style={{ color: '#023D54' }}>Complaints Overview</h2>
        <table className="table table-bordered table-hover">
          <thead>
            <tr style={{ backgroundColor: '#3c4542', color: 'white' }}>
              <th>Date</th>
              <th>Student Name</th>
              <th>Complaint</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => {
              const rowStyle =
                complaint.status === 'Resolved'
                  ? { opacity: '0.5', transition: 'opacity 0.5s ease-in-out' }
                  : {}    

              return (
                <tr key={complaint._id} style={rowStyle}>
                  <td>{new Date(complaint.date).toDateString()}</td>
                  <td>{complaint.studentId.name}</td>
                  <td>{complaint.complaintText}</td>
                  <td>
                    <select
                      className="form-select"
                      value={selectedStatus[complaint._id] || complaint.status}
                      onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>

                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdateStatus(complaint._id)}
                    >
                      Update Status
                    </button>
                  </td>
                  <td><button className="btn btn-danger btn-sm" onClick={()=>deleteComplaint(complaint._id)}>Delete</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      )}
      
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export default ViewComplaints;
