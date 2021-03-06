import React, { Component } from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';
import RaisedButton from 'material-ui/RaisedButton';

import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';

import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';

import TextField from 'material-ui/TextField';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      websiteText: [],
      url: "http://www.ema.europa.eu/ema/",
      showEmptyFieldWarning: false,
      keywords: ["Health"]
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
    if (this.state.url.length === 0) {
      if (this.state.showEmptyFieldWarning === false) {
        this.setState({
          showEmptyFieldWarning: true
        });
      }
      return;
    }

    let urlData = {
      url: this.state.url,
      keywords: this.state.keywords
    }

    axios.post(`/siteData`, { urlData })
      .then(res => {
        // console.log(res);
        console.log(res.data);
        this.setState({ websiteText: res.data })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onSnackbarClose = () => {
    if (this.state.showEmptyFieldWarning === true) {
      this.setState({
        showEmptyFieldWarning: false
      });
    }
  }

  render() {
    console.log(" this.state.websiteText: ", this.state.websiteText.hasOwnProperty('error'))
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
            <CardTitle title="Enter a site to scrape data from." />
            <TextField
              defaultValue="http://www.ema.europa.eu/ema/"
              className="url-text-field"
              onChange={this.setURl}
            />
            <CardActions>
              <RaisedButton label="Scrape"
                onClick={() => { this.fetchSiteData() }} />
            </CardActions>
          </Card>

          {(!this.state.websiteText.hasOwnProperty('error') && this.state.keywords.length > 0) ? (
            this.state.websiteText.map((text_arr, index) =>
              <Card key={index}
                className="url-input-card"
              >
                <CardTitle title={"Keyword: " + text_arr.word} />
                <CardText>{"Total Count: " + text_arr.wordCount}</CardText>

                <CardText>{"List of texts containing this keyword: "}</CardText>

                {text_arr.hasOwnProperty('texts') ? text_arr.texts.map((text, index) =>
                  <Card key={index}
                    className="url-input-card2"
                  >
                    <CardText>{text}</CardText>
                  </Card>
                ) : null}

              </Card>
            )) : null}

          {(!this.state.websiteText.hasOwnProperty('error') && this.state.keywords.length === 0) ? (
            this.state.websiteText.map((text_arr, index) =>
              <Card key={index}
                className="url-input-card"
              >
                <CardText>{text_arr}</CardText>

              </Card>
            )) : null}




          {this.state.websiteText.hasOwnProperty('error') ?
            <Card className="url-input-card" >
              <CardTitle title={this.state.websiteText.text} />
            </Card>
            : null}

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