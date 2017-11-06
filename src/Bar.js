import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class Bar extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              React - Public API's
            </Typography>
            <Button color="contrast">GITHUB</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Bar;