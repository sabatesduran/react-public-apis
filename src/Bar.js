import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';

class Bar extends Component {
  render() {
    const styles = {
      flex: {
        flex: 1,
      }
    }

    return (
      <div>
        <AppBar position="fixed">
          <Toolbar>
            <Typography type="title" color="inherit" style={styles.flex}>
              React - Public API's
            </Typography>

            <Button color="contrast" href="https://github.com/sabatesduran/react-public-apis">
              GITHUB
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Bar;