import React from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import AddStudent from './admin/AddStudent';
import AddFoodItem from './admin/AddFoodItem';
import ViewStudents from './admin/ViewStudents';
import ViewComplaints from './admin/ViewComplaints';
import MakeAnnouncement from './admin/MakeAnnouncement';

function AdminDashboard() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      {/* <Nav variant="tabs" defaultActiveKey="/admin">
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/add-student`}>Add Student</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/add-food-item`}>Add Food Item</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/view-students`}>View Students</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/view-complaints`}>View Complaints</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/make-announcement`}>Make Announcement</Nav.Link>
        </Nav.Item>
      </Nav> */}

      <Switch>
        <Route path={`${path}/add-student`} component={AddStudent} />
        <Route path={`${path}/add-food-item`} component={AddFoodItem} />
        <Route path={`${path}/view-students`} component={ViewStudents} />
        <Route path={`${path}/view-complaints`} component={ViewComplaints} />
        <Route path={`${path}/make-announcement`} component={MakeAnnouncement} />
      </Switch>
    </div>
  );
}

export default AdminDashboard;
