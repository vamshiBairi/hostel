import React, { useState } from "react";
import axios from "axios";
import { AiOutlineFontSize } from "react-icons/ai";
import { FaBullhorn } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MakeAnnouncement() {
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleMakeAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/make-announcement",
        {
          title,
          content,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      toast.success("Success");
      setTitle("");
      setContent("");
    } catch (error) {
      toast.error("Error");
      console.error("Making announcement failed", error);
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center "
        style={{
          background: "linear-gradient(150deg,#E6F0DC, #94DEA5)", 
          minHeight: "100vh",
          padding: "20px",
          margin: "0",
        }}
      >
        <div
          className="card p-4 shadow-sm"
          style={{
            backgroundColor: "#94DEA5 ",
            borderRadius: "15px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2 className="mb-4 text-center" style={{ color: "white" }}>
            Make an Announcement
          </h2>
          <form onSubmit={handleMakeAnnouncement}>
            <div className="mb-3">
              <label
                htmlFor="announcementTitle"
                className="form-label"
                style={{ color: "white" }}
              >
                <AiOutlineFontSize
                  className="me-2"
                  style={{ color: "#023D54" }}
                />
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="announcementTitle"
                placeholder="Enter the title of the announcement"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="announcementContent"
                className="form-label"
                style={{ color: "white" }}
              >
                <FaBullhorn
                  className="me-2"
                  style={{ color: "#023D54", rotate: "-30deg" }}
                />
                Announce Below
              </label>
              <textarea
                className="form-control"
                id="announcementContent"
                rows="5"
                placeholder="Enter the content of the announcement"
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                backgroundColor: "#023D54",
                borderColor: "black",
              }}
            >
              Announce
            </button>
          </form>
        </div>
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
    </>
  );
}

export default MakeAnnouncement;
