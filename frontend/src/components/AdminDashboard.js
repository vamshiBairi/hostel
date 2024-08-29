import React from "react";
import { Route, Routes, Link ,useNavigate} from "react-router-dom";
import AddStudent from "./admin/AddStudent";
import AddFoodItem from "./admin/AddFoodItem";
import ViewStudents from "./admin/ViewStudents";
import ViewComplaints from "./admin/ViewComplaints";
import MakeAnnouncement from "./admin/MakeAnnouncements";
import SelectedFoodAdmin from "./admin/SelectedFood";
import ViewMenu from "./admin/ViewMenu";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function  AdminDashboard() {
  const navigate = useNavigate();
  const handlelogout=()=>{
    localStorage.removeItem('token');
    toast.success('Successfully logged out');
    setTimeout(()=>{

      navigate('/');
    },1000)
    
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ background: "#5EA285" }}
      >
        <Link
          className="navbar-brand mx-4 fs-3"
          to="/"
          style={{ fontFamily: "Kavoon" }}
        >
          GoodDay
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto ms-auto">
            <li className="nav-item">
              <Link
                className="nav-link "
                to="/admin"
                style={{ color: "#023D54", fontWeight: "bold" }}
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/selected-food"
                style={{ color: "#023D54", fontWeight: "bold" }}
              >
                Food
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/admin/complaints"
                style={{ color: "#023D54", fontWeight: "bold" }}
              >
                Complaints
              </Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                style={{ color: "#023D54", fontWeight: "bold" }}
              >
                Actions
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  className="dropdown-item"
                  to="/admin/add-food-item"
                  style={{ color: "#023D54", fontWeight: "bold" }}
                >
                  Add Food
                </Link>
                <Link
                  className="dropdown-item"
                  to="/admin/add-student"
                  style={{ color: "#023D54", fontWeight: "bold" }}
                >
                  Add Student
                </Link>
                <Link
                  className="dropdown-item"
                  to="/admin/view-students"
                  style={{ color: "#023D54", fontWeight: "bold" }}
                >
                  Student Log
                </Link>
                <Link
                  className="dropdown-item"
                  to="/admin/make-announcement"
                  style={{ color: "#023D54", fontWeight: "bold" }}
                >
                  Make Announcement
                </Link>
              </div>
            </li>

            <div className="border border-dark border-start m-1"></div>
            <li className="nav-item">
              <button
                className="nav-link ms-4 me-2 border border-dark rounded p-1 mt-1"
                onClick={handlelogout}
                style={{
                  background: "#f12323",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </nav>
      {/* <ViewMenu/> */}
      <Routes>
        <Route path="/" element={<ViewMenu />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-food-item" element={<AddFoodItem />} />
        <Route path="/view-students" element={<ViewStudents />} />
        <Route path="/complaints" element={<ViewComplaints />} />
        <Route path="/selected-food" element={<SelectedFoodAdmin />} />
        <Route path="/make-announcement" element={<MakeAnnouncement />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export default AdminDashboard;
