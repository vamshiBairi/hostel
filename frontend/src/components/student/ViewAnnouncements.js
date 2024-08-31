import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
function ViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLanding] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/student/announcements",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setAnnouncements(response.data);
        setLanding(false);
      } catch (error) {
        toast.error("Please Login ");
        setLanding(false);
        console.error("Fetching announcements failed", error);
      }
    };

    fetchAnnouncements();
  }, [token]);

  return (
    <div
      className="d-flex justify-content-center"
      style={{
        background: "linear-gradient(150deg, #E6F0DC, #94DEA5)",
        minHeight: "100vh",
        padding: "20px",
        margin: "0",
      }}
    >
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="container-fluid">
          <h2 className="text-center mb-4" style={{ color: "#023D54" }}>
            Announcements
          </h2>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr style={{ backgroundColor: "#3c4542", color: "white" }}>
                  <th style={{ backgroundColor: "gray"}}>Date</th>
                  <th style={{ backgroundColor: "gray"}}>Title</th>
                  <th style={{ backgroundColor: "gray"}}>Content</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement._id}>
                    <td>{new Date(announcement.date).toLocaleDateString()}</td>
                    <td>{announcement.title}</td>
                    <td>{announcement.content}</td>
                  </tr>
                ))}
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

export default ViewAnnouncements;
