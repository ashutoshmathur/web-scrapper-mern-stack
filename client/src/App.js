import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';

import { Card, CardActions, CardTitle } from 'material-ui/Card';

import TextField from 'material-ui/TextField';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      websiteText: [],
      url: "http://www.theglitch.in/index.php/",
      showEmptyFieldWarning: false
    };
    this.setURl = this.setURl.bind(this);
    this.fetchSiteData = this.fetchSiteData.bind(this);
    this.onSnackbarClose = this.onSnackbarClose.bind(this);
  }

  setURl = (e, val) => {
    this.setState({
      url: val
    });
    // console.log("e: ", e, " val: ", val);
    // console.log("this.state.url: ", this.state.url);
  }

  fetchSiteData = () => {
    if(this.state.url.length === 0 ) {
      if(this.state.showEmptyFieldWarning === false) {
        this.setState({
          showEmptyFieldWarning: true
        });
      }
      return;
    }

    let urlData = {
      url: this.state.url
    }

    axios.post(`/users`, { urlData })
    .then(res => {
      // console.log(res);
      // console.log(res.data);
      this.setState({ websiteText: res.data })
    })
  }

  onSnackbarClose = () => {
    if(this.state.showEmptyFieldWarning === true) {
      this.setState({
        showEmptyFieldWarning: false
      });
    }
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
          <Card
            className="url-input-card"
          >
            <CardTitle title="Enter a site to scrape data from."/>
            <TextField
              defaultValue="http://www.theglitch.in/index.php/"
              className="url-text-field"
              onChange={this.setURl}
            />
            <CardActions>
              <RaisedButton label="Scrape" 
              onClick={() => {this.fetchSiteData()}}/>
            </CardActions>
          </Card>

          {this.state.websiteText.map((text_arr, index) =>        
            <Card  key={index}
              className="url-input-card"
            >
              <CardTitle title={text_arr.text}/>
              
            </Card>
          )}
          
          <Snackbar
            open={this.state.showEmptyFieldWarning}
            message="Please enter a vaid URL"
            autoHideDuration={2000}
            onRequestClose={this.onSnackbarClose}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;