import React, { Component } from "react";

import Typography from "material-ui/Typography";
import Grid from "material-ui/Grid";

import ApiCard from "./ApiCard";

class ApiCardList extends Component {
  createApiCards() {
    return this.props.apis.map((api, index) => {
      return (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <ApiCard api={api} />
        </Grid>
      );
    });
  }

  render() {
    const { apis } = this.props;
    return (
      <Grid id="apiList" container spacing={24}>
        {apis.length ? (
          this.createApiCards()
        ) : (
          <Grid key={apis.lenght} item xs={12}>
            <Typography type="title" color="inherit">
              No public API's found.
            </Typography>
          </Grid>
        )}
      </Grid>
    );
  }
}

export default ApiCardList;
