import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";

function ViewComplaints() {
  const token = localStorage.getItem("token");
  const [complaints, setComplaints] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/complaints",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const sortedComplaints = response.data.sort((a, b) => {
          if (a.status === "Resolved" && b.status !== "Resolved") return 1;
          if (a.status !== "Resolved" && b.status === "Resolved") return -1;
          return new Date(b.date) - new Date(a.date);
        });
        setComplaints(sortedComplaints);
        setLoading(false);
      } catch (error) {
        console.error("Fetching complaints failed", error);
        setError("Fetching Complaints failed");
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [token]);

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const deleteComplaint = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/admin/remove-complaint/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Deleted complaint:", response.data);
      toast.success("Successfully closed complaint");
      setComplaints((prevComplaint) =>
        prevComplaint.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Deleting complaint failed", error);
      toast.error("Failed to delete complaint");
    }
  };

  const handleUpdateStatus = async (id) => {
    const status = selectedStatus[id];
    if (!status) return;

    try {
      await axios.put(
        `http://localhost:5000/admin/update-complaint-status/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComplaints((prev) =>
        prev
          .map((complaint) =>
            complaint._id === id ? { ...complaint, status } : complaint
          )
          .sort((a, b) => {
            if (a.status === "Resolved" && b.status !== "Resolved") return 1;
            if (a.status !== "Resolved" && b.status === "Resolved") return -1;
            return new Date(b.date) - new Date(a.date);
          })
      );
      setSelectedStatus((prev) => ({
        ...prev,
        [id]: undefined,
      }));
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Error in updating status");
      console.error("Updating status failed", error);
    }
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        background: "linear-gradient(150deg,#E6F0DC, #94DEA5)",
        minHeight: "100vh",
        padding: "20px",
        margin: "0",
        width: "100%",
        overflowX: "Scroll",
        boxSizing: "border-box",
      }}
    >
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <div className="text-center text-danger">{error}</div>
      ) :(
        <div className="container-fluid">
          <h2
            className="text-center mb-4 border border-dark rounded"
            style={{ color: "#023D54" }}
          >
            Complaints Overview
          </h2>
          <div
            className="table-responsive"
            style={{
              overflowX: "auto",
              width: "100%",
            }}
          >
            <table
              className="table table-bordered table-hover table-sm "
              style={{ minWidth: "100%" }}
            >
              <thead>
                <tr style={{ backgroundColor: "#3c4542", color: "white" }}>
                  <th style={{ backgroundColor: "gray"}}>Date</th>
                  <th style={{ backgroundColor: "gray"}}>Student Name</th>
                  <th style={{ backgroundColor: "gray"}}>Complaint</th>
                  <th style={{ backgroundColor: "gray"}}>Status</th>
                  <th style={{ backgroundColor: "gray"}}>Actions</th>
                  <th style={{ backgroundColor: "gray"}}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => {
                  const rowStyle =
                    complaint.status === "Resolved"
                      ? {
                          opacity: "0.5",
                          transition: "opacity 0.5s ease-in-out",
                        }
                      : {};

                  return (
                    <tr key={complaint._id} style={rowStyle}>
                      <td>{new Date(complaint.date).toDateString()}</td>
                      <td>{complaint.studentId.name}</td>
                      <td>{complaint.complaintText}</td>
                      <td>
                        <select
                          className="form-select form-select-sm"
                          value={
                            selectedStatus[complaint._id] || complaint.status
                          }
                          onChange={(e) =>
                            handleStatusChange(complaint._id, e.target.value)
                          }
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
                          Update
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteComplaint(complaint._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

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

export default ViewComplaints;
