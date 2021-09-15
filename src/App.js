import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditBlog from './components/EditBlog';
import CreateBlog from './components/CreateBlog';
import ViewBlog from './components/ViewBlog';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path={`/edit-blog/:id`}>
          <EditBlog />
        </Route>
        <Route path={`/view-blog/:id`}>
          <ViewBlog />
        </Route>
        <Route path="/create-blog">
          <CreateBlog />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
