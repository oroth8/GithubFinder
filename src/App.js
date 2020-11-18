import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/About'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import User from './components/users/User'
import axios from "axios"
import './App.css';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }
  searchUsers = async (text) => {
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data.items, loading: false})
  }
  // Get a signle github user
  getUser = async (username) => {
    this.setState({loading: true})

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({user: res.data, loading: false})
  }
  // clear users
  clearUsers = () => this.setState({users: [], loading: false})
  // set alert
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert: null}), 5000);
  }
  render() {
    const {users, loading, user} = this.state;
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="container">
        <Alert alert={this.state.alert}/>
        <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search 
                searchUsers={this.searchUsers} 
                clearUsers={this.clearUsers} 
                showClear={users.length > 0 ? true:false} 
                setAlert={this.setAlert}
                />
                <Users loading={loading} users={users}/>
              </Fragment>
            )}
            />
            <Route exact path='/about' component={About}/>
            <Route exact path="/user/:login" render={props=> (
              <User {...props} getUser={this.getUser} user={user} loading={loading}/>
              )} />
        </Switch>
      </div>
    </div>
    </Router>
  );
  }
}

export default App;
