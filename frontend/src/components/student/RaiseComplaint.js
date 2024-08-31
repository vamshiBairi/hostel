import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RaiseComplaint() {
  const [complaintText, setComplaintText] = useState("");

  const handleRaiseComplaint = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:5000/student/raise-complaint",
        { complaintText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Successfully raised");
      setComplaintText("");
      console.log(response.data);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Raising complaint failed", error);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(150deg, #E6F0DC, #94DEA5)",
        minHeight: "100vh",
        padding: "20px",
        margin: "0",
      }}
    >
      <div className="d-flex justify-content-center">
        <h2
          className="text-center mb-4 border border-dark rounded"
          style={{ color: "#023D54", width: "50rem" }}
        >
          Raise a Complaint
        </h2>
      </div>
      <div className="d-flex justify-content-center">
        <form
          onSubmit={handleRaiseComplaint}
          className="border border-dark rounded p-4"
          style={{ background: "#F2F8F1", width: "50rem" }}
        >
          <div className="form-group">
            <label htmlFor="complaintText">Help us to Improve :</label>
            <textarea
              id="complaintText"
              className="form-control"
              rows={3}
              placeholder="Enter complaint text"
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3"
            style={{ backgroundColor: "#023D54", borderColor: "#023D54" }}
          >
            Raise Complaint
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default RaiseComplaint;
