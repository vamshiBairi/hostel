import React, { useState } from "react";
import axios from "axios";

function MakeAnnouncement() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleMakeAnnouncement = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/admin/make-announcement", {
        title,
        content,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Making announcement failed", error);
    }
  };

  return (
    <>
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #C9DABF, #9CA986)",
        height:"100%",
        width:"100%"    // Add padding to ensure the card doesn't touch the edges
      }}
    >
      
      <div
        className="card p-4 shadow-sm"
        style={{
          backgroundColor: "#9CA986",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "500px"
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
              backgroundColor: "#3c4542",
              borderColor: "black",
            }}
          >
            Announce
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default MakeAnnouncement;
