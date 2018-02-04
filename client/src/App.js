import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import { Card, CardActions, CardTitle } from 'material-ui/Card';

import TextField from 'material-ui/TextField';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <AppBar
            title="Web Scrapper"
            showMenuIconButton={false}
            className="app-bar"
          />
          <h1>Users</h1>
          {this.state.users.map(user =>
            <div key={user.id}>{user.username}</div>
          )}
          <Card
            className="url-input-card"
          >
            <CardTitle title="Enter a site to scrape data from."/>
            <TextField
              hintText="Enter URL"
              className="url-text-field"
            />
            <CardActions>
              <RaisedButton label="Scrape" />
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;