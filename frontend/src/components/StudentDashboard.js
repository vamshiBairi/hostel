import React from 'react';
import { Route, Link, Routes,useNavigate } from 'react-router-dom';
import SelectMeal from './student/SelectMeal';
import RaiseComplaint from './student/RaiseComplaint';
import Announcements from './student/ViewAnnouncements';
import Bottom from './Bottom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function StudentDashboard() {
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
      <nav className="navbar navbar-expand-lg navbar-light" style={{background:'#5EA285'}}>
      <Link className="navbar-brand mx-4 fs-3" to="/" style={{fontFamily:'Kavoon'}}>GoodDay</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto ms-auto" >
          <li className="nav-item active">
            <Link className="nav-link mx-2 " to="/student-dashboard/" style={{color:'#023D54',fontWeight: 'bold'}}>Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link mx-2 " to="/student-dashboard/raise-complaint" style={{color:'#023D54' , fontWeight: 'bold'}}>RaiseComplaint</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  " to="/student-dashboard/announcements" style={{color:'#023D54' ,fontWeight: 'bold'}}>Notifications</Link>
          </li>
          <div className='border border-dark border-left m-1  '></div>
          <li className="nav-item">
            <button className="me-2 ml-4 border border-dark rounded p-1 mt-1" onClick={handlelogout} style={{background:'#f12323' ,color:'black' ,fontWeight: 'bold'}}>LogOut</button>
          </li>
          
        </ul>
      </div>
      </nav>
      <Routes>
        <Route path={"/raise-complaint"} element={<RaiseComplaint/>} />
        <Route path={"/announcements"} element={<Announcements/>} />
        <Route path="/" element={<SelectMeal/>} />
      </Routes>
      <Bottom/>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
}

export default StudentDashboard;
