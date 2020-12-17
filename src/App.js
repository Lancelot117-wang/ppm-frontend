import './App.css';
import Header from './component/Layout/Header';
import Dashboard from './component/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AddProject from './component/Project/AddProject';
import {Provider} from 'react-redux';
import store from './store';
import UpdateProject from './component/Project/UpdateProject';
import ProjectBoard from './component/ProjectBoard/ProjectBoard';
import AddProjectTask from './component/ProjectBoard/ProjectTasks/AddProjectTask';
import UpdateProjectTask from './component/ProjectBoard/ProjectTasks/UpdateProjectTask';
import Landing from './component/Layout/Landing';
import Register from './component/UserManagement/Register';
import Login from './component/UserManagement/Login';
import jwt_decode from 'jwt-decode';
import setJWTToken from './securityUtils/setJWTToken';
import { SET_CURRENT_USER } from './action/types';
import { logout } from './action/securityActions';
import SecureRoute from './securityUtils/SecureRoute';

const jwtToken = localStorage.jwtToken;

if(jwtToken){
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now();
  if(decoded_jwtToken.exp<currentTime){
    store.dispatch(logout());
    window.location.href="/";
  }
}

function App() {
  return (
  	<Provider store={store}>
  	  <Router>
        <div className="App">
          <Header />

          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />

          <Switch>
          <SecureRoute exact path="/dashboard" component={Dashboard} />
          <SecureRoute exact path="/addProject" component={AddProject} />
          <SecureRoute exact path="/updateProject/:id" component={UpdateProject} />
          <SecureRoute exact path="/projectBoard/:id" component={ProjectBoard} />
          <SecureRoute exact path="/addProjectTask/:id" component={AddProjectTask} />
          <SecureRoute exact path="/updateProjectTask/:backlog_id/:pt_id" component={UpdateProjectTask} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
