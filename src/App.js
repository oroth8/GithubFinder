import React, {useState, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/About'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import User from './components/users/User'
import axios from "axios"
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);

  
  // Get a signle github user
  
  // clear users
 
  // get user repo
  const getUserRepo = async (username) => {
    setLoading(true)

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }
  // set alert
  const showAlert = (msg, type) => {
    setAlert({msg, type})
    setTimeout(() => setAlert(null), 5000);
  }
  
  return (
    <GithubState>
    <Router>
    <div className="App">
      <Navbar/>
      <div className="container">
        <Alert alert={alert}/>
        <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                showAlert={showAlert}
                />
                <Users/>
              </Fragment>
            )}
            />
            <Route exact path='/about' component={About}/>
            <Route exact path="/user/:login" render={props=> (
              <User {...props} getUserRepo={getUserRepo}  repos={repos}/>
              )} />
        </Switch>
      </div>
    </div>
    </Router>
    </GithubState>
  );
}

export default App;
