import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
// import StudentDashboard from './components/StudentDashboard';
// import Login from './components/Login';
// import AdminDashboard from './components/AdminDashboard';
// import MakeAnnouncement from './components/admin/MakeAnnouncements';
// import AddFoodItem from './components/admin/AddFoodItem';
// import AddStudent from './components/admin/AddStudent';
// import Navbar from './components/Navbar';
// import ViewComplaints from './components/admin/ViewComplaints';
// import ViewStudents from './components/admin/ViewStudents';
// import SelectMeal from './components/student/SelectMeal';
// import ViewAnnouncements from './components/student/ViewAnnouncements';
function App() {
  return (
    <div className="App">
      <AdminDashboard/>
      <div className="container mt-3">
        {/* <Switch>
          <Route path="/admin" component={AdminDashboard} />
          <Route path="/student" component={StudentDashboard} />
          <Route path="/login" component={Login} />
        </Switch> */}
      </div>
    </div>
  );
}

export default App;
