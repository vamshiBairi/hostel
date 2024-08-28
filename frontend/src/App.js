import React from 'react';
import { Route,Routes} from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import './index.css';
import StudentDashboard from './components/StudentDashboard';
// import Login from './components/Login';
// import AdminDashboard from './components/AdminDashboard';
import MakeAnnouncement from './components/admin/MakeAnnouncements';
import AddFoodItem from './components/admin/AddFoodItem';
import AddStudent from './components/admin/AddStudent';
import Navbar from './components/Navbar';
import ViewComplaints from './components/admin/ViewComplaints';
import ViewStudents from './components/admin/ViewStudents';
import SelectMeal from './components/student/SelectMeal';
import ViewAnnouncements from './components/student/ViewAnnouncements';
import LoginPage from './Landing/Login';
// import Slides from './Landing/';
// import LoginPage from './Landing/Login';
function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        {/* <Route path="/admin/*" element={<AdminDashboard />} />  */}
        {/* <Route path="/student-dashboard/*" element={<StudentDashboard />}/> */}
        {/* Add other routes here */}
      </Routes>
      {/* <StudentDashboard/> */}
      {/* <LoginPage/> */}
      {/* <div className="container mt-3">
        <Switch>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/student" component={StudentDashboard} />
          <Route path="/login" component={Login} />
        </Switch>
      </div> */}
    </div>
  );
}

export default App;
