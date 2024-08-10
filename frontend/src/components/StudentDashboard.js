import React from 'react';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import ViewMenu from './student/ViewMenu';
import SelectMeal from './student/SelectMeal';
import RaiseComplaint from './student/RaiseComplaint';
import Announcements from './student/Announcements';

function StudentDashboard() {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Nav variant="tabs" defaultActiveKey="/student">
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/view-menu`}>View Menu</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/select-meal`}>Select Meal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/raise-complaint`}>Raise Complaint</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to={`${url}/announcements`}>Announcements</Nav.Link>
        </Nav.Item>
      </Nav>

      <Switch>
        <Route path={`${path}/view-menu`} component={ViewMenu} />
        <Route path={`${path}/select-meal`} component={SelectMeal} />
        <Route path={`${path}/raise-complaint`} component={RaiseComplaint} />
        <Route path={`${path}/announcements`} component={Announcements} />
      </Switch>
    </div>
  );
}

export default StudentDashboard;
