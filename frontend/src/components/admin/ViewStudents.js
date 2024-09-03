import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ViewStudents() {
  const token = localStorage.getItem("token");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://hostel-api-vu1f.onrender.com/admin/view-students",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Fetching students failed", error);
        setError("Fetching students failed");
        setLoading(false);
      }
    };

    fetchStudents();
  }, [token]);
  const handleDelete = async (id) => {
    try {
      const response = await axios.post(
        `https://hostel-api-vu1f.onrender.com/admin/remove-student/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Deleted Student:", response.data);
      toast.success("Successfully removed");
      setStudents((prevStudents) =>
        prevStudents.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Deleting complaint", error);
      toast.error("Failed");
    }
  };
  return (
    <div
      className="d-flex justify-content-center"
      style={{
        background: "linear-gradient(150deg,#E6F0DC, #94DEA5)",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        margin: "0",
        overflowX:"Scroll",
        boxSizing: "border-box",
      }}
    >
      <div className="container-fluid">
        <h2
          className="text-center mb-4 border border-dark rounded"
          style={{ color: "#023D54" }}
        >
          Students Overview
        </h2>
        
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : (
          <div
            className="table-responsive"
            style={{
              overflowX: "auto",
              width: "100%",
            }}
          >
          <table className="table table-bordered table-hover d-fex justify-content-center">
            <thead>
              <tr style={{ backgroundColor: "#3c4542", color: "white" }}>
                <th style={{ backgroundColor: "gray"}}>Name</th>
                <th style={{ backgroundColor: "gray"}}>Email</th>
                <th style={{ backgroundColor: "gray"}}>Phone</th>
                <th style={{ backgroundColor: "gray"}}>Room Number</th>
                <th style={{ backgroundColor: "gray"}}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.roomNumber}</td>
                  <td>
                    <Button
                      className="btn-danger btn-sm"
                      onClick={() => {
                        handleDelete(student._id);
                      }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default ViewStudents;
